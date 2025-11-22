import { encrypt, decrypt } from '../utils/ccav/ccavutil.js'
import qs from 'querystring'

// Default test credentials keyed by host/origin path. These are only fallbacks
// for local development and are overridden by environment variables where set.
const TEST_CONFIGS = [
  { host: 'localhost:3000', accessCode: process.env.CCAV_ACCESS_3000 || 'ATCQ06MI58CC87QCCC', workingKey: process.env.CCAV_WORKING_3000 || 'EA187D5B19217F017785D19DE7292873' },
  { host: 'localhost:5173', accessCode: process.env.CCAV_ACCESS_5173 || 'ATCQ06MI58CC86QCCC', workingKey: process.env.CCAV_WORKING_5173 || '9D6E5C9C2F92978AF9729AB20EE968D5' },
  { host: 'localhost:8080', accessCode: process.env.CCAV_ACCESS_8080 || 'ATCQ06MI58CC88QCCC', workingKey: process.env.CCAV_WORKING_8080 || '5F5EDC7DA92DDDF5D9D99741ED6D8529' }
]

// If global CCAV env vars are set (CCAV_ACCESS_CODE / CCAV_WORKING_KEY) use
// them as a top-level fallback so operators don't have to set host-specific
// env vars.
function envFallbackConfig() {
  if (process.env.CCAV_ACCESS_CODE && process.env.CCAV_WORKING_KEY) {
    return { host: 'env', accessCode: process.env.CCAV_ACCESS_CODE, workingKey: process.env.CCAV_WORKING_KEY }
  }
  return null
}

function pickConfigFromHost(host) {
  // Prefer an explicit host match from TEST_CONFIGS
  if (host) {
    const found = TEST_CONFIGS.find(c => host.includes(c.host))
    if (found) return found
  }

  // If the operator supplied CCAV_ACCESS_CODE and CCAV_WORKING_KEY in the
  // environment, use those.
  const envCfg = envFallbackConfig()
  if (envCfg) return envCfg

  // Otherwise fall back to the 5173 test config which is commonly used with Vite
  return TEST_CONFIGS[1]
}

// POST /api/ccav/initiate
// Expects a urlencoded form body with order parameters (amount, billing_name, etc.)
export async function createCcavRequest(req, res) {
  const origin = req.get('origin') || req.get('referer') || ''
  // hostHeader will fallback to req.hostname when host header is not present.
  const hostHeader = req.get('host') || req.hostname || ''
  const cfg = pickConfigFromHost(origin || hostHeader)
  const merchantId = process.env.CCAV_MERCHANT_ID
  // Choose test or production CCAvenue endpoint.
  // If CCAV_USE_TEST_ENDPOINT is explicitly set to 'true' use the test gateway.
  // Otherwise, automatically prefer the test gateway for local/dev origins or when NODE_ENV is not 'production'.
  const useTestEnvVar = process.env.CCAV_USE_TEST_ENDPOINT === 'true'
  // consider request local when origin or host header/hostname contains localhost/127.0.0.1
  const isLocalOrigin = /localhost|127\.0\.0\.1/.test(origin || hostHeader)
  const isDevNodeEnv = process.env.NODE_ENV !== 'production'
  const ccavBase = (useTestEnvVar || isLocalOrigin || isDevNodeEnv) ? 'https://test.ccavenue.com' : 'https://secure.ccavenue.com'

  // Validate that we have the keys required for encryption before proceeding.
  if (!cfg || !cfg.workingKey || !cfg.accessCode || !merchantId) {
    return res.status(500).json({
      error: true,
      message: 'CCAvenue configuration missing. Set CCAV_ACCESS_CODE, CCAV_WORKING_KEY, and CCAV_MERCHANT_ID (or host-specific env vars) in environment.'
    })
  }

  // Helpful logging for debugging merchant authentication errors. Do NOT log workingKey.
  console.log('[CCAV] initiating request', { origin, matchedHost: cfg.host, accessCode: cfg.accessCode, merchantId, ccavEndpoint: ccavBase })

  // The CCAV request expects a single string of key=value&key2=value2...
  const plain = qs.stringify(req.body || {})

  let encRequest
  try {
    encRequest = encrypt(plain, cfg.workingKey)
  } catch (err) {
    return res.status(500).json({ error: true, message: 'Failed to encrypt CCAV request', detail: err.message })
  }

  // Return an HTML form that auto-submits to CCAvenue
  const form = `<!doctype html><html><head><meta charset="utf-8"><title>Redirecting to CCAvenue</title></head><body><form id="ccavForm" method="post" action="${ccavBase}/transaction/transaction.do?command=initiateTransaction">` +
    `<input type="hidden" name="encRequest" value="${encRequest}"/>` +
    `<input type="hidden" name="access_code" value="${cfg.accessCode}"/>` +
    `<input type="hidden" name="merchant_id" value="${merchantId}"/>` +
    `</form><script>document.getElementById('ccavForm').submit()</script></body></html>`

  res.set('Content-Type', 'text/html')
  res.status(200).send(form)
}

// DEBUG: Return encrypted request as JSON instead of redirecting to CCAvenue.
// Useful for local testing to inspect encRequest without performing a real redirect.
export async function createCcavRequestDebug(req, res) {
  const origin = req.get('origin') || req.get('referer') || ''
  const hostHeader = req.get('host') || req.hostname || ''
  const cfg = pickConfigFromHost(origin || hostHeader)

  // Use the same endpoint selection logic as createCcavRequest so debug output matches behavior.
  const useTestEnvVar = process.env.CCAV_USE_TEST_ENDPOINT === 'true'
  const isLocalOrigin = /localhost|127\.0\.0\.1/.test(origin || hostHeader)
  const isDevNodeEnv = process.env.NODE_ENV !== 'production'
  const ccavBase = (useTestEnvVar || isLocalOrigin || isDevNodeEnv) ? 'https://test.ccavenue.com' : 'https://secure.ccavenue.com'

  if (!cfg || !cfg.workingKey || !cfg.accessCode) {
    return res.status(500).json({
      error: true,
      message: 'CCAvenue configuration missing. Set CCAV_ACCESS_CODE and CCAV_WORKING_KEY (or CCAV_ACCESS_<PORT>/CCAV_WORKING_<PORT>) in environment.'
    })
  }

  const plain = qs.stringify(req.body || {})
  let encRequest
  try {
    encRequest = encrypt(plain, cfg.workingKey)
  } catch (err) {
    return res.status(500).json({ error: true, message: 'Failed to encrypt CCAV request', detail: err.message })
  }

  // Do NOT enable this in production. This endpoint is for developer debugging only.
  return res.status(200).json({ encRequest, access_code: cfg.accessCode, merchant_id: process.env.CCAV_MERCHANT_ID, ccav_endpoint: `${ccavBase}/transaction/transaction.do?command=initiateTransaction` })
}

// POST /api/ccav/response
// CCAvenue will POST back an encResp field; decrypt and display the parsed response
export async function handleCcavResponse(req, res) {
  // body is urlencoded like encResp=... so accept both body parsing and raw
  const encResp = req.body?.encResp || req.body?.encResponse || req.body || ''
  // pick config from referer or host if possible (fallback to default)
  const origin = req.get('origin') || req.get('referer') || ''
  const cfg = pickConfigFromHost(origin || req.hostname)

  if (!cfg || !cfg.workingKey) {
    return res.status(500).json({ error: true, message: 'CCAvenue working key missing on server. Set CCAV_WORKING_KEY or the host-specific env var.' })
  }

  let encString = ''
  if (typeof encResp === 'string') encString = encResp
  else if (encResp.encResp) encString = encResp.encResp
  else if (encResp.encResponse) encString = encResp.encResponse

  try {
    const decrypted = decrypt(encString, cfg.workingKey)
    // Convert k=v&k2=v2 into a simple HTML table for quick debugging
    const rows = decrypted.split('&').map(pair => {
      const [k = '', v = ''] = pair.split('=')
      return `<tr><td>${k}</td><td>${v}</td></tr>`
    }).join('')

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>CCAvenue Response</title></head><body><h2>CCAvenue Response</h2><table border="1" cellpadding="6">${rows}</table></body></html>`
    res.set('Content-Type', 'text/html')
    res.status(200).send(html)
  } catch (err) {
    res.status(500).json({ error: 'Failed to decrypt CCAV response', message: err.message })
  }
}
