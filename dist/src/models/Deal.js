"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const DealSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Deal', DealSchema);
