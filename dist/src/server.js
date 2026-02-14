"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const error_middleware_1 = require("./middleware/error.middleware");
// Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const destination_routes_1 = __importDefault(require("./routes/destination.routes"));
const deal_routes_1 = __importDefault(require("./routes/deal.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Database connection middleware - ensures DB is connected before handling requests
const ensureDBConnection = async (req, res, next) => {
    try {
        // connectDB() handles its own caching and will return the same promise for concurrent calls
        await (0, database_1.default)();
        next();
    }
    catch (error) {
        console.error('Database connection error:', error);
        res.status(503).json({
            message: 'Database connection unavailable',
            error: process.env.NODE_ENV === 'production' ? undefined : String(error)
        });
    }
};
// In non-serverless environments, connect to DB immediately at startup
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
    (0, database_1.default)().catch(error => {
        console.error('Failed to connect to database at startup:', error);
    });
}
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files
app.use('/uploads', express_1.default.static('uploads'));
// Health check (no DB required)
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});
// Apply database connection middleware to all API routes
app.use('/api', ensureDBConnection);
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/properties', property_routes_1.default);
app.use('/api/bookings', booking_routes_1.default);
app.use('/api/reviews', review_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/destinations', destination_routes_1.default);
app.use('/api/deals', deal_routes_1.default);
// Error handler
app.use(error_middleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
// Only start the server if not in serverless environment (e.g., Vercel)
// Vercel sets the VERCEL environment variable automatically
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
exports.default = app;
