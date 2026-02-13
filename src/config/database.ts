import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedDatabase } from '../seeds/seed';

dotenv.config();

let connectionPromise: Promise<void> | null = null;

const connectDB = async (): Promise<void> => {
  // If a connection is already in progress or established, return the existing promise
  if (connectionPromise) {
    return connectionPromise;
  }

  // If already connected via mongoose, return early
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  // Create a new connection promise
  connectionPromise = (async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/booking-clone');
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      
      // Seed database with mock data if enabled
      // NEVER seed in serverless/production environments unless explicitly enabled
      // Respect explicit SEED_DB=false setting, otherwise seed only in development or when SEED_DB=true
      const shouldSeed = process.env.SEED_DB === 'true' || 
        (process.env.SEED_DB !== 'false' && 
         process.env.NODE_ENV === 'development' && 
         !process.env.VERCEL && 
         !process.env.AWS_LAMBDA_FUNCTION_NAME);
      
      if (shouldSeed) {
        await seedDatabase();
      }
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error}`);
      // Reset the promise so future attempts can retry
      connectionPromise = null;
      // Don't exit in serverless environments (Vercel, AWS Lambda, etc.)
      // Let the request fail gracefully instead
      if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
        process.exit(1);
      }
      throw error;
    }
  })();

  return connectionPromise;
};

export default connectDB;
