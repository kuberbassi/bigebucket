import mongoose from "mongoose";
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env from server directory
dotenv.config({ path: path.join(__dirname, '..', '.env') })

/**
 * MongoDB Connection Configuration
 * 
 * Handles database connection with retry logic and comprehensive error handling.
 * Provides detailed diagnostics for troubleshooting connection issues.
 */

// Default local MongoDB URI for development
const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/BigebucketDB'

// Determine MongoDB URI based on environment
const MONGO_URI = process.env.MONGODB_URI || (process.env.NODE_ENV !== 'production' ? DEFAULT_LOCAL_URI : null)

// Connection retry configuration
const MAX_RETRIES = 3
const RETRY_DELAY = 5000 // 5 seconds

/**
 * Sleep utility for retry delays
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Connect to MongoDB database with retry logic
 * @param {number} retryCount - Current retry attempt
 * @returns {Promise<void>}
 */
async function connectDB(retryCount = 0) {
    try {
        // Check if MongoDB URI is available
        if (!MONGO_URI) {
            console.warn('⚠️  No MONGODB_URI found. Running without database connection.')
            console.warn('⚠️  Please set MONGODB_URI in .env file or ensure MongoDB is running locally.')
            return // Gracefully continue without DB
        }

        const attemptMsg = retryCount > 0 ? ` (Attempt ${retryCount + 1}/${MAX_RETRIES + 1})` : ''
        console.log(`🔌 Connecting to MongoDB...${attemptMsg}`)

        // Mask password in URI for logging
        const maskedURI = MONGO_URI.replace(/:[^:@]+@/, ':****@')
        console.log('📍 URI:', maskedURI)
        console.log('📍 Type:', MONGO_URI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB')

        // Connect with optimized options
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000, // 10s timeout (reduced for faster failure detection)
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
            family: 4, // Use IPv4
            appName: 'bigebucket-server'
        })

        console.log('✅ MongoDB connected successfully!')
        console.log(`📊 Database: ${mongoose.connection.name}`)
        console.log(`🌐 Host: ${mongoose.connection.host}`)
        console.log(`📡 Ready State: ${mongoose.connection.readyState}`)

        // Set up connection event listeners
        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...')
        })

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message)
        })

        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected successfully!')
        })

    } catch (error) {
        console.error(`❌ MongoDB connection error (Attempt ${retryCount + 1}/${MAX_RETRIES + 1}):`, error.message)

        // Provide detailed error diagnostics
        if (error.message.includes('ECONNREFUSED')) {
            console.error('💡 Connection Refused - Possible causes:')
            console.error('   • MongoDB server is not running')
            console.error('   • Incorrect host or port')
            console.error('   • Firewall blocking the connection')
            if (!MONGO_URI.includes('mongodb+srv')) {
                console.error('   • Try starting MongoDB: mongod --dbpath /path/to/data')
            }
        } else if (error.message.includes('authentication') || error.message.includes('auth')) {
            console.error('💡 Authentication Failed - Possible causes:')
            console.error('   • Incorrect username or password')
            console.error('   • User does not have access to the database')
            console.error('   • Check MONGODB_URI format: mongodb+srv://username:password@cluster.mongodb.net/database')
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT') || error.message.includes('timed out')) {
            console.error('💡 Network/Timeout Error - Possible causes:')
            console.error('   • No internet connection')
            console.error('   • MongoDB Atlas cluster is paused or deleted')
            console.error('   • IP address not whitelisted in MongoDB Atlas Network Access')
            console.error('   • DNS resolution failed')
            console.error('')
            console.error('🔧 To fix IP whitelist issue:')
            console.error('   1. Go to MongoDB Atlas → Network Access')
            console.error('   2. Click "Add IP Address"')
            console.error('   3. Either add your current IP or use 0.0.0.0/0 for development (allow all)')
        } else if (error.message.includes('bad auth')) {
            console.error('💡 Bad Authentication - Possible causes:')
            console.error('   • Password contains special characters that need URL encoding')
            console.error('   • Try encoding special characters in password')
        } else {
            console.error('💡 Unknown Error:', error.message)
            console.error('   • Full error:', error)
        }

        // Retry logic
        if (retryCount < MAX_RETRIES) {
            console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`)
            await sleep(RETRY_DELAY)
            return connectDB(retryCount + 1)
        }

        // Max retries exceeded
        console.error(`❌ Failed to connect after ${MAX_RETRIES + 1} attempts`)
        console.warn('⚠️  Server will continue without database connection')
        console.warn('⚠️  API endpoints will return empty data until database is connected')
        console.warn('')
        console.warn('🔄 To retry connection:')
        console.warn('   • Fix the connection issue')
        console.warn('   • Restart the server with: npm start')
    }
}

export default connectDB