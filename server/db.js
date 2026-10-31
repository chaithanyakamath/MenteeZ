import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mentee_db';

/**
 * Global cache for Mongoose connection across serverless invocations (Vercel Lambdas).
 * In serverless environments, caching the connection prevents exhausting connection
 * limits and eliminates cold start reconnection overhead on every request.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const currentUri = process.env.MONGODB_URI || MONGODB_URI;

  // If already connected, return cached connection immediately
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Optimized for serverless connection pooling
      minPoolSize: 0,
      serverSelectionTimeoutMS: 8000, // Timeout fast instead of hanging
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4 for fast DNS resolution
    };

    const maskedUri = currentUri.replace(/:([^:@]+)@/, ':****@');
    console.log(`🔌 Initializing MongoDB connection (${maskedUri})...`);

    cached.promise = mongoose.connect(currentUri, opts).then((mongooseInstance) => {
      console.log(` Connected to MongoDB successfully`);
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error(`❌ MongoDB connection error:`, err.message);
    throw err;
  }

  return cached.conn;
}

export default connectDB;
