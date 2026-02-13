import mongoose, { Schema, Document } from 'mongoose';

export interface IDeal extends Document {
  title: string;
  description: string;
  location: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  propertyType: string;
  checkInDate: string;
  checkOutDate: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DealSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Deal title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Image is required']
    },
    originalPrice: {
      type: Number,
      required: [true, 'Original price is required'],
      min: [0, 'Original price cannot be negative']
    },
    discountedPrice: {
      type: Number,
      required: [true, 'Discounted price is required'],
      min: [0, 'Discounted price cannot be negative']
    },
    discount: {
      type: Number,
      required: [true, 'Discount percentage is required'],
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5']
    },
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      trim: true
    },
    checkInDate: {
      type: String,
      required: [true, 'Check-in date is required']
      // Note: Stored as display string (e.g., "Fri, Feb 14") for promotional purposes
      // Actual booking dates use Date type in the Booking model
    },
    checkOutDate: {
      type: String,
      required: [true, 'Check-out date is required']
      // Note: Stored as display string (e.g., "Sun, Feb 16") for promotional purposes
      // Actual booking dates use Date type in the Booking model
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IDeal>('Deal', DealSchema);
