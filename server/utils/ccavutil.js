// Re-export the primary CCAV util implementation located at project root.
// Some older scripts import this file path; re-exporting avoids accidental
// runtime errors when code expects encrypt/decrypt to exist.
export { encrypt, decrypt } from '../ccavutil.js'
