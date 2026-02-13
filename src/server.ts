import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { errorHandler } from './middleware/error.middleware';

// Routes
import authRoutes from './routes/auth.routes';
import propertyRoutes from './routes/property.routes';
import bookingRoutes from './routes/booking.routes';
import reviewRoutes from './routes/review.routes';
import userRoutes from './routes/user.routes';
import destinationRoutes from './routes/destination.routes';
import dealRoutes from './routes/deal.routes';

dotenv.config();

const app: Express = express();

// Database connection middleware - ensures DB is connected before handling requests
const ensureDBConnection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // connectDB() handles its own caching and will return the same promise for concurrent calls
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(503).json({ 
      message: 'Database connection unavailable', 
      error: process.env.NODE_ENV === 'production' ? undefined : String(error)
    });
  }
};

// In non-serverless environments, connect to DB immediately at startup
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  connectDB().catch(error => {
    console.error('Failed to connect to database at startup:', error);
  });
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Health check (no DB required)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Apply database connection middleware to all API routes
app.use('/api', ensureDBConnection);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/deals', dealRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start the server if not in serverless environment (e.g., Vercel)
// Vercel sets the VERCEL environment variable automatically
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
