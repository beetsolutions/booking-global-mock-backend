# Booking Clone - Backend API

Backend API for the Booking.com clone application built with Express.js, TypeScript, and MongoDB.

## Features

- User authentication with JWT
- Property management (CRUD operations)
- Booking system with availability checking
- Reviews and ratings
- Search and filtering
- File upload for property images

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Security**: helmet, cors, bcrypt
- **File Upload**: Multer

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/booking-clone
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
SEED_DB=true
```

## Mock Data Seeding

The application automatically seeds the database with realistic mock data on startup when:
- The database is empty (first run)
- `NODE_ENV` is set to `development`, OR
- `SEED_DB` environment variable is set to `true`

### Seeded Data Includes:

- **16 Users**:
  - 1 Admin (email: `admin@booking.com`, password: `admin123`)
  - 5 Hosts
  - 10 Guests
  - All other users have password: `password123`

- **25 Properties**: 
  - Diverse property types (Apartments, Houses, Villas, Condos, etc.)
  - Multiple locations (New York, London, Paris, Tokyo, Barcelona, Amsterdam, Rome, Sydney, Dubai, Singapore)
  - Realistic amenities, prices, and capacity
  - Property images from placeholder service

- **20 Bookings**:
  - Various statuses (pending, confirmed, cancelled, completed)
  - Past, present, and future bookings
  - Realistic check-in/check-out dates

- **Reviews**:
  - Generated for ~80% of completed bookings
  - Ratings from 3-5 stars
  - Realistic review comments

### Disabling Auto-Seed

To disable automatic seeding in development, set `SEED_DB=false` in your `.env` file:
```
SEED_DB=false
```

Or run in production mode:
```
NODE_ENV=production
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Properties
- `GET /api/properties` - Get all properties (with filters & pagination)
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property (protected, host only)
- `PUT /api/properties/:id` - Update property (protected, host only)
- `DELETE /api/properties/:id` - Delete property (protected, host only)
- `GET /api/properties/search` - Search properties with filters

### Bookings
- `GET /api/bookings` - Get user's bookings (protected)
- `GET /api/bookings/:id` - Get booking by ID (protected)
- `POST /api/bookings` - Create booking (protected)
- `PUT /api/bookings/:id` - Update booking status (protected)
- `DELETE /api/bookings/:id` - Cancel booking (protected)
- `GET /api/bookings/property/:id/availability` - Check property availability

### Reviews
- `GET /api/reviews/property/:id` - Get property reviews
- `POST /api/reviews` - Create review (protected)
- `PUT /api/reviews/:id` - Update review (protected)
- `DELETE /api/reviews/:id` - Delete review (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

## Project Structure

```
backend/
├── api/                    # Vercel serverless entry point
│   └── index.ts
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Property.ts
│   │   ├── Booking.ts
│   │   └── Review.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── property.routes.ts
│   │   ├── booking.routes.ts
│   │   ├── review.routes.ts
│   │   └── user.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── property.controller.ts
│   │   ├── booking.controller.ts
│   │   ├── review.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── upload.middleware.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── validators.ts
│   ├── types/
│   │   └── index.ts
│   ├── seeds/
│   │   └── seed.ts
│   └── server.ts
├── uploads/
├── .env.example
├── .vercelignore
├── vercel.json
├── nodemon.json
├── tsconfig.json
└── package.json
```

## Deployment

### Deploy to Railway

This backend is optimized for deployment to Railway, which provides persistent hosting with no timeout limitations.

#### Quick Deploy Steps:

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository

2. **Create a Railway Account**:
   - Go to [railway.app](https://railway.app)
   - Sign up or log in with GitHub

3. **Create a New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

4. **Configure Environment Variables** in Railway:
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secure-jwt-secret-key
   JWT_EXPIRE=7d
   SEED_DB=false
   ```
   
   **Note**: Railway automatically provides the `PORT` environment variable. The app is configured to use it.

5. **Deploy**: Railway will automatically detect the Node.js app, run `npm run build`, and start with `npm start`

6. **Get Your API URL**: Copy the deployment URL from Railway dashboard (e.g., `https://your-app.railway.app`)

#### Configuration Files:

- **`nixpacks.toml`**: Optimizes Railway build configuration
- **`package.json`**: Contains build and start scripts Railway uses

#### MongoDB Setup:

For production, use MongoDB Atlas (free tier available):
1. Create a cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Get your connection string
3. Add it as `MONGODB_URI` environment variable in Railway
4. Whitelist Railway's IP addresses or use `0.0.0.0/0` (less secure but easier)

### Deploy to Vercel

This backend is pre-configured for deployment to Vercel with serverless functions.

#### Quick Deploy Steps:

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Set **Root Directory** to `backend`
   - Select **Framework Preset**: Other

3. **Configure Environment Variables** in Vercel:
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secure-jwt-secret-key
   JWT_EXPIRE=7d
   ```
   
   **Note**: Vercel automatically sets the `VERCEL` environment variable. The server detects this to determine it's running in a serverless environment.

4. **Deploy**: Click "Deploy" and wait for the build to complete

5. **Get Your API URL**: Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

#### Configuration Files:

- **`vercel.json`**: Configures Vercel build settings and routing
- **`api/index.ts`**: Serverless entry point that exports the Express app  
- **`.vercelignore`**: Excludes unnecessary files from deployment

For detailed deployment instructions including MongoDB Atlas setup and troubleshooting, see the [Deployment Guide](../DEPLOYMENT.md) in the repository root.

### Alternative Deployment Options

For better performance and no timeout limitations, you can also deploy to:
- **Railway.app**: Ideal for Node.js applications
- **Render.com**: Simple deployment with automatic HTTPS
- **DigitalOcean App Platform**: Scalable hosting
- **Heroku**: Easy deployment with CLI

See the main [Deployment Guide](../DEPLOYMENT.md) for instructions on these platforms.

## License

MIT
