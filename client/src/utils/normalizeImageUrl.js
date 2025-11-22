// Utility to normalize image URLs returned from the server.
// If the backend stored local src paths like "src/assets/xyz.png" we
// convert them to proper URLs Vite can serve using `new URL(..., import.meta.url)`.
export function normalizeImageUrl(img) {
  if (!img) return ''

  // If the backend returned an object (Cloudinary or similar), try common fields
  if (typeof img === 'object' && img !== null) {
    if (img.url) return normalizeImageUrl(img.url)
    if (img.secure_url) return normalizeImageUrl(img.secure_url)
    if (img.path) return normalizeImageUrl(img.path)
    if (img.src) return normalizeImageUrl(img.src)
    if (img.filename) return normalizeImageUrl(img.filename)
    // If none of the above, return empty string instead of stringified object
    console.warn('Could not extract image URL from object:', img)
    return ''
  }

  // At this point `img` should be a string
  if (typeof img !== 'string') {
    console.warn('Image is not a string or object:', typeof img, img)
    return ''
  }

  // sanitize common malformed values: trailing commas, bracket-encoded arrays, or comma separated lists
  let trimmed = img.trim()
  // normalize backslashes to forward slashes (Windows paths)
  trimmed = trimmed.replace(/\\+/g, '/')
  // Example: "/src/assets/mite.png," -> remove trailing commas
  trimmed = trimmed.replace(/,+$/g, '')

  // If the value looks like an array string: "['a.png']" or '["a.png"]'
  if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('(') && trimmed.endsWith(')'))) {
    try {
      const parsed = JSON.parse(trimmed.replace(/'/g, '"'))
      if (Array.isArray(parsed) && parsed.length) {
        // take first element and normalize it
        return normalizeImageUrl(parsed[0])
      }
    } catch (e) {
      // ignore and continue
    }
  }

  // If comma-separated list, take first non-empty token
  if (trimmed.includes(',')) {
    const parts = trimmed.split(',').map(s => s.trim()).filter(Boolean)
    if (parts.length) trimmed = parts[0]
  }

  trimmed = trimmed.trim()
  if (!trimmed) return ''

  // Already a full URL
  if (/^https?:\/\//i.test(trimmed)) return trimmed

  // Backend exported Vite source path like 'src/assets/...' or '/src/assets/...' -> convert to relative path
  if (/^\/?src\/assets\//.test(trimmed)) {
    try {
      const cleaned = trimmed.replace(/^\/?src\//, '')
      return new URL(`../${cleaned}`, import.meta.url).href
    } catch (e) {
      return trimmed
    }
  }

  // If the path contains 'assets/' anywhere (for example Windows absolute paths or other variants),
  // try to extract the portion after 'assets/' and resolve it from the client's assets directory.
  const assetsIndex = trimmed.toLowerCase().indexOf('assets/')
  if (assetsIndex >= 0) {
    try {
      const afterAssets = trimmed.slice(assetsIndex + 'assets/'.length).replace(/^\/+/, '')
      // resolve via Vite import URL from client/src/assets
      return new URL(`../assets/${afterAssets}`, import.meta.url).href
    } catch (e) {
      // fallback to trimmed value
      return trimmed
    }
  }

  // Already absolute or rooted path (root-relative URL)
  if (trimmed.startsWith('/')) return trimmed

  // Bare filename (e.g. "amul_taaza.png") or relative path without src/ -> attempt to resolve from client/src/assets
  // This allows seed values like 'amul_taaza.png' to load from the project's assets during dev/build.
  try {
    return new URL(`../assets/${trimmed.replace(/^\/+/, '')}`, import.meta.url).href
  } catch (e) {
    // Fallback: return as-is
    return trimmed
  }
}

export function normalizeImageArray(arr) {
  if (!arr) return []
  if (Array.isArray(arr)) {
    const normalized = arr.map(a => normalizeImageUrl(a)).filter(Boolean)
    return normalized.length > 0 ? normalized : ['']
  }
  const normalized = normalizeImageUrl(arr)
  return normalized ? [normalized] : ['']
}
