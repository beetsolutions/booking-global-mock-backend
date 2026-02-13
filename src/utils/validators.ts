import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  role: z.enum(['guest', 'host', 'admin']).optional()
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  propertyType: z.string().min(1, 'Property type is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  pricePerNight: z.number().min(0, 'Price must be positive'),
  maxGuests: z.number().min(1, 'At least 1 guest required'),
  bedrooms: z.number().min(0, 'Bedrooms cannot be negative'),
  bathrooms: z.number().min(0, 'Bathrooms cannot be negative'),
  amenities: z.array(z.string()).optional(),
  rules: z.string().optional()
});

export const bookingSchema = z.object({
  propertyId: z.string().min(1, 'Property ID is required'),
  checkInDate: z.string().min(1, 'Check-in date is required'),
  checkOutDate: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1, 'At least 1 guest required')
});

export const reviewSchema = z.object({
  propertyId: z.string().min(1, 'Property ID is required'),
  bookingId: z.string().min(1, 'Booking ID is required'),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(1, 'Comment is required')
});
