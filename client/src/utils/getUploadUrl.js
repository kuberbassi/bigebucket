// Attempt to extract an uploaded file URL from common response shapes
export default function getUploadUrl(response) {
    if (!response) return null

    // If this is an Axios response, prefer response.data
    const res = response.data ?? response

    // Common normalized spots (server returns data: { url, secure_url, raw })
    const candidates = [
        res?.data?.url,
        res?.data?.secure_url,
        res?.url,
        res?.secure_url,
        res?.data,
        res
    ]

    for (const c of candidates) {
        if (!c) continue
        if (typeof c === 'string' && c.trim()) return c.trim()
        if (typeof c === 'object') {
            if (typeof c.url === 'string' && c.url.trim()) return c.url.trim()
            if (typeof c.secure_url === 'string' && c.secure_url.trim()) return c.secure_url.trim()
        }
    }

    // Fallback: recursively search object for a URL-like string
    const urlRegex = /(https?:\/\/[^"]+)|(\/[\w\-\/]+\.(png|jpg|jpeg|webp|gif))/i
    const seen = new WeakSet()

    function findUrl(obj) {
        if (!obj) return null
        if (typeof obj === 'string') {
            const m = obj.match(urlRegex)
            return m ? m[0] : null
        }
        if (typeof obj !== 'object' || seen.has(obj)) return null
        seen.add(obj)
        for (const key of Object.keys(obj)) {
            try {
                const v = obj[key]
                const found = findUrl(v)
                if (found) return found
            } catch (e) { /* ignore */ }
        }
        return null
    }

    return findUrl(res)
}
