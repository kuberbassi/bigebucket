/**
 * Bigebucket E-Commerce Platform - Server Entry Point
 * 
 * This is the main server file that configures and starts the Express application.
 * It handles:
 * - Middleware configuration (CORS, security, parsing)
 * - API route registration
 * - Static file serving for production
 * - Database connection
 * - Error handling
 */

// Core dependencies
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables - check both root and server directories
const envPath = path.join(__dirname, '.env')
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
    console.log('✅ Loaded .env from server directory')
} else {
    dotenv.config() // Fallback to default (cwd)
    console.log('ℹ️  Loaded .env from default location (cwd)')
}

import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'
import compression from 'compression'

// Database configuration
import connectDB from './config/connectDB.js'

// Route imports
import userRouter from './routes/user.route.js'
import categoryRouter from './routes/category.route.js'
import uploadRouter from './routes/upload.router.js'
import subCategoryRouter from './routes/subCategory.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import addressRouter from './routes/address.route.js'
import orderRouter from './routes/order.route.js'
import ccavRouter from './routes/ccav.route.js'

// Initialize Express application
const app = express()

// Configure CORS properly
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174'
].filter(Boolean)

let corsOptions
if (process.env.NODE_ENV !== 'production') {
    // In development allow all origins so the frontend dev server can proxy requests
    corsOptions = {
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 200
    }
} else {
    corsOptions = {
        origin: function (origin, callback) {
            if (!origin) return callback(null, true)
            if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true)
            // Deny unknown origin without throwing an exception
            return callback(null, false)
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 200
    }
}

app.use(cors(corsOptions))
app.use(compression()) // Enable gzip compression for better performance
app.use(express.json())
// Parse application/x-www-form-urlencoded for form POSTs
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use a concrete morgan format to avoid deprecation warnings
app.use(morgan('combined'))

// Configure Helmet security headers with relaxed CSP for development
app.use(helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'https:'],
            connectSrc: ["'self'", 'https:', 'http:'],
            imgSrc: ["'self'", 'data:', 'https:', 'http:'],
            styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
            formAction: ["'self'", 'https://secure.ccavenue.com', 'https://test.ccavenue.com']
        }
    } : false // Disable CSP in development
}))

const PORT = process.env.PORT || 8080

// Normalize FRONTEND_URL (remove trailing slash) and expose for logging
const FRONTEND_URL_RAW = process.env.FRONTEND_URL || 'https://bigebucket.com'
const FRONTEND_URL = FRONTEND_URL_RAW.endsWith('/') ? FRONTEND_URL_RAW.slice(0, -1) : FRONTEND_URL_RAW

// Trust proxy (useful when behind cPanel / reverse proxy) so secure cookies and
// protocol detection work correctly.
app.set('trust proxy', 1)

console.log('Using FRONTEND_URL =', FRONTEND_URL)

// Health check endpoint for debugging
app.get('/api/health', (request, response) => {
    response.json({
        status: 'running',
        port: PORT,
        nodeEnv: process.env.NODE_ENV,
        mongoConnected: mongoose.connection.readyState === 1
    })
})

app.use('/api/user', userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/file", uploadRouter)
app.use("/api/subcategory", subCategoryRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use('/api/order', orderRouter)
app.use('/api/ccav', ccavRouter)

// --- ROBUST PATH FINDER ---
function findPublicDir() {
    console.log('🔍 Searching for public directory...')

    try {
        const possiblePaths = [
            path.join(__dirname, 'public'),                     // If running from server/
            path.join(process.cwd(), 'server', 'public'),       // If running from root (cPanel standard)
            path.join(process.cwd(), 'public'),                 // If running from inside server/
            path.join(__dirname, '..', 'public'),               // If __dirname is inside a config folder
        ]

        // Add cPanel fallback only if not on Windows (simple check)
        if (path.sep === '/') {
            possiblePaths.push('/home/anjalibigebucket/public_html/server/public')
        }

        for (const p of possiblePaths) {
            try {
                if (fs.existsSync(p)) {
                    console.log(`✅ Found public directory at: ${p}`)
                    return p
                }
            } catch (e) {
                // Ignore errors checking specific paths
            }
        }
    } catch (e) {
        console.error('❌ Error in findPublicDir:', e)
    }

    console.error('❌ Could not find public directory in any common location!')
    return path.join(__dirname, 'public') // Default fallback
}

const publicPath = findPublicDir()
console.log('📁 Serving static files from:', publicPath)

// Serve static files
try {
    if (publicPath && typeof publicPath === 'string') {
        app.use(express.static(publicPath))
        app.use('/assets', express.static(path.join(publicPath, 'assets')))
    } else {
        console.error('❌ Invalid publicPath, skipping static file serving')
    }
} catch (e) {
    console.error('❌ Error setting up static files:', e)
}

// Debug endpoint to check if assets exist and list them
app.get('/api/debug-assets', (req, res) => {
    const assetsPath = publicPath ? path.join(publicPath, 'assets') : 'Invalid publicPath'

    let files = []
    let error = null
    try {
        if (publicPath && fs.existsSync(assetsPath)) {
            files = fs.readdirSync(assetsPath)
        } else {
            error = 'Assets directory not found'
        }
    } catch (e) {
        error = e.message
    }

    res.json({
        debug: true,
        cwd: process.cwd(),
        dirname: __dirname,
        publicPath,
        assetsPath,
        exists: publicPath ? fs.existsSync(assetsPath) : false,
        filesCount: files.length,
        first5Files: files.slice(0, 5),
        error
    })
})

// Handle React routing - serve index.html for all non-API routes
// Using app.use middleware to avoid potential PathError with '*' in some Express versions
app.use((req, res, next) => {
    // Only handle GET requests
    if (req.method !== 'GET') return next()

    // Skip API routes
    if (req.path.startsWith('/api')) return next()

    // Safety check for publicPath
    if (!publicPath || typeof publicPath !== 'string') {
        console.error('❌ publicPath is invalid during request to *')
        return res.status(500).send('Server Error: publicPath is not defined')
    }

    const indexPath = path.join(publicPath, 'index.html')

    try {
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath, (err) => {
                if (err) {
                    // Only log if it's not a client abort
                    if (err.code !== 'ECONNABORTED') {
                        console.error('❌ Error sending index.html:', err)
                    }
                    next(err)
                }
            })
        } else {
            console.error(`❌ index.html not found at ${indexPath}`)
            res.status(404).send(`
                <h1>Deployment Error</h1>
                <p>Could not find index.html at: ${indexPath}</p>
                <p>Current Working Directory: ${process.cwd()}</p>
                <p>Please verify file structure and permissions.</p>
                <p><a href="/api/debug-assets">Check Debug Info</a></p>
            `)
        }
    } catch (error) {
        console.error('❌ Unexpected error in catch-all route:', error)
        res.status(500).send('Internal Server Error')
    }
})

// Provide a tiny runtime configuration endpoint the frontend can query
// at boot. This allows the same built frontend to work on different hosts
// without rebuilding (frontend can read `/runtime-config` to get the
// backend URL or other runtime settings).
app.get('/runtime-config', (req, res) => {
    // If VITE_API_BASE_URL was set at build time, prefer that. Otherwise
    // allow an explicit BACKEND_URL env var (useful in some hosting setups).
    const apiBase = process.env.VITE_API_BASE_URL || process.env.BACKEND_URL || ''
    res.json({
        apiBaseUrl: apiBase,
        frontendUrl: FRONTEND_URL
    })
})

// Start server and attempt database connection
// Server will start even if database connection fails (useful for development)
connectDB().catch(err => {
    console.error('Database connection failed, but server will continue:', err.message)
})


app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
    console.log(`📍 API available at: http://localhost:${PORT}`)
    console.log(`🌐 Frontend URL: ${FRONTEND_URL}`)
})



// Express error handler: catch any errors passed to next(err)
app.use((err, req, res, next) => {
    console.error('Unhandled express error:', err && (err.stack || err.message || err))
    if (res.headersSent) return next(err)
    res.status(500).json({
        message: err && (err.message || 'Internal Server Error'),
        error: true,
        success: false
    })
})

// process-level handlers to avoid silent crashes and produce useful logs
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err && (err.stack || err.message || err))
    // do not exit automatically in dev; in production consider exiting
})
