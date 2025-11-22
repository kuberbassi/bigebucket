import express from 'express'
import { createCcavRequest, handleCcavResponse } from '../controllers/ccav.controller.js'

const router = express.Router()

// Initiate a CCAvenue transaction. Accepts form fields in the POST body and
// returns an HTML form which will auto-submit to CCAvenue.
router.post('/initiate', createCcavRequest)

// Response handler endpoint that CCAvenue will POST back to after payment
router.post('/response', express.urlencoded({ extended: false }), handleCcavResponse)

// Debug endpoint that returns the encrypted payload and access code as JSON
// for local testing. Not intended for production use.
import { createCcavRequestDebug } from '../controllers/ccav.controller.js'
router.post('/debug', createCcavRequestDebug)

export default router
