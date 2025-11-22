import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

/**
 * MongoDB Connection Configuration
 * 
 * Handles database connection with graceful fallback for development.
 * In development, defaults to local MongoDB instance.
 * In production, requires explicit MONGODB_URI environment variable.
 */

// Default local MongoDB URI for development
const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/BigebucketDB'

// Determine MongoDB URI based on environment
const MONGO_URI = process.env.MONGODB_URI || (process.env.NODE_ENV !== 'production' ? DEFAULT_LOCAL_URI : null)

/**
 * Connect to MongoDB database
 * @returns {Promise<void>}
 */
async function connectDB() {
    try {
        // Check if MongoDB URI is available
        if (!MONGO_URI) {
            console.warn('⚠️  No MONGODB_URI found. Running without database connection.')
            console.warn('⚠️  Please set MONGODB_URI in .env file or ensure MongoDB is running locally.')
            return // Gracefully continue without DB
        }

        console.log('🔌 Connecting to MongoDB...')
        console.log('📍 Type:', MONGO_URI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB')

        // Connect with optimized options for cPanel/shared hosting
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // 30s timeout for shared hosting
            socketTimeoutMS: 60000, // 60s socket timeout
            connectTimeoutMS: 30000, // 30s connection timeout
            family: 4, // Use IPv4
            appName: 'bigebucket-server'
        })

        console.log('✅ MongoDB connected successfully!')
        console.log(`📊 Database: ${mongoose.connection.name}`)
        console.log(`🌐 Host: ${mongoose.connection.host}`)

    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message)

        // Provide helpful error messages
        if (error.message.includes('ECONNREFUSED')) {
            console.error('💡 Tip: Make sure MongoDB is running locally or check your MONGODB_URI')
            console.error('   Start MongoDB: mongod --dbpath /path/to/data')
        } else if (error.message.includes('authentication') || error.message.includes('auth')) {
            console.error('💡 Tip: Check your MongoDB username and password in MONGODB_URI')
            console.error('   Format: mongodb+srv://username:password@cluster.mongodb.net/database')
        } else if (error.message.includes('network') || error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
            console.error('💡 Tip: Check your internet connection for MongoDB Atlas')
            console.error('   Also verify your IP is whitelisted in MongoDB Atlas Network Access')
        }

        // Always continue without DB, don't crash the server
        console.warn('⚠️  Server will continue without database connection...')
        console.warn('⚠️  API endpoints will return empty data until database is connected')
    }
}

export default connectDB