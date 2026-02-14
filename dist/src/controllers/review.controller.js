"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getPropertyReviews = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const Booking_1 = __importDefault(require("../models/Booking"));
const validators_1 = require("../utils/validators");
const getPropertyReviews = async (req, res) => {
    try {
        const reviews = await Review_1.default.find({ propertyId: req.params.id })
            .populate('userId', 'firstName lastName avatar')
            .sort('-createdAt');
        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0;
        res.json({
            reviews,
            averageRating: Math.round(avgRating * 10) / 10,
            totalReviews: reviews.length
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPropertyReviews = getPropertyReviews;
const createReview = async (req, res) => {
    try {
        const validatedData = validators_1.reviewSchema.parse(req.body);
        const booking = await Booking_1.default.findById(validatedData.bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to review this booking' });
        }
        if (booking.status !== 'completed') {
            return res.status(400).json({ message: 'Can only review completed bookings' });
        }
        const existingReview = await Review_1.default.findOne({ bookingId: validatedData.bookingId });
        if (existingReview) {
            return res.status(400).json({ message: 'Review already exists for this booking' });
        }
        const review = await Review_1.default.create({
            ...validatedData,
            userId: req.user._id
        });
        res.status(201).json(review);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createReview = createReview;
const updateReview = async (req, res) => {
    try {
        const review = await Review_1.default.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }
        const { rating, comment } = req.body;
        if (rating)
            review.rating = rating;
        if (comment)
            review.comment = comment;
        await review.save();
        res.json(review);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    try {
        const review = await Review_1.default.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }
        await Review_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review removed' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteReview = deleteReview;
