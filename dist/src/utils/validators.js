"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = exports.bookingSchema = exports.propertySchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    phone: zod_1.z.string().optional(),
    role: zod_1.z.enum(['guest', 'host', 'admin']).optional()
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required')
});
exports.propertySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    propertyType: zod_1.z.string().min(1, 'Property type is required'),
    address: zod_1.z.string().min(1, 'Address is required'),
    city: zod_1.z.string().min(1, 'City is required'),
    country: zod_1.z.string().min(1, 'Country is required'),
    coordinates: zod_1.z.object({
        lat: zod_1.z.number(),
        lng: zod_1.z.number()
    }).optional(),
    pricePerNight: zod_1.z.number().min(0, 'Price must be positive'),
    maxGuests: zod_1.z.number().min(1, 'At least 1 guest required'),
    bedrooms: zod_1.z.number().min(0, 'Bedrooms cannot be negative'),
    bathrooms: zod_1.z.number().min(0, 'Bathrooms cannot be negative'),
    amenities: zod_1.z.array(zod_1.z.string()).optional(),
    rules: zod_1.z.string().optional()
});
exports.bookingSchema = zod_1.z.object({
    propertyId: zod_1.z.string().min(1, 'Property ID is required'),
    checkInDate: zod_1.z.string().min(1, 'Check-in date is required'),
    checkOutDate: zod_1.z.string().min(1, 'Check-out date is required'),
    guests: zod_1.z.number().min(1, 'At least 1 guest required')
});
exports.reviewSchema = zod_1.z.object({
    propertyId: zod_1.z.string().min(1, 'Property ID is required'),
    bookingId: zod_1.z.string().min(1, 'Booking ID is required'),
    rating: zod_1.z.number().min(1).max(5, 'Rating must be between 1 and 5'),
    comment: zod_1.z.string().min(1, 'Comment is required')
});
