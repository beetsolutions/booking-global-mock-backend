import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'guest' | 'host' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export interface IProperty extends Document {
  title: string;
  description: string;
  propertyType: string;
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  hostId: string;
  rules?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBooking extends Document {
  propertyId: string;
  userId: string;
  checkInDate: Date;
  checkOutDate: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview extends Document {
  propertyId: string;
  userId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
