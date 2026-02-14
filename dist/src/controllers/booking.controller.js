"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAvailability = exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBooking = exports.getBookings = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const Property_1 = __importDefault(require("../models/Property"));
const validators_1 = require("../utils/validators");
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking_1.default.find({ userId: req.user._id })
            .populate('propertyId')
            .populate('userId', 'firstName lastName email')
            .sort('-createdAt');
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getBookings = getBookings;
const getBooking = async (req, res) => {
    try {
        const booking = await Booking_1.default.findById(req.params.id)
            .populate('propertyId')
            .populate('userId', 'firstName lastName email');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this booking' });
        }
        res.json(booking);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getBooking = getBooking;
const createBooking = async (req, res) => {
    try {
        const validatedData = validators_1.bookingSchema.parse(req.body);
        const property = await Property_1.default.findById(validatedData.propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        if (validatedData.guests > property.maxGuests) {
            return res.status(400).json({ message: 'Number of guests exceeds property capacity' });
        }
        const checkIn = new Date(validatedData.checkInDate);
        const checkOut = new Date(validatedData.checkOutDate);
        if (checkIn >= checkOut) {
            return res.status(400).json({ message: 'Check-out date must be after check-in date' });
        }
        // Check for overlapping bookings
        const overlappingBooking = await Booking_1.default.findOne({
            propertyId: validatedData.propertyId,
            status: { $in: ['pending', 'confirmed'] },
            $or: [
                {
                    checkInDate: { $lte: checkOut },
                    checkOutDate: { $gte: checkIn }
                }
            ]
        });
        if (overlappingBooking) {
            return res.status(400).json({ message: 'Property is not available for selected dates' });
        }
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * property.pricePerNight;
        const booking = await Booking_1.default.create({
            propertyId: validatedData.propertyId,
            userId: req.user._id,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            guests: validatedData.guests,
            totalPrice
        });
        res.status(201).json(booking);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createBooking = createBooking;
const updateBooking = async (req, res) => {
    try {
        const booking = await Booking_1.default.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this booking' });
        }
        const { status } = req.body;
        if (status && !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        booking.status = status || booking.status;
        await booking.save();
        res.json(booking);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking_1.default.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this booking' });
        }
        booking.status = 'cancelled';
        await booking.save();
        res.json({ message: 'Booking cancelled' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteBooking = deleteBooking;
const checkAvailability = async (req, res) => {
    try {
        const { checkInDate, checkOutDate } = req.query;
        if (!checkInDate || !checkOutDate) {
            return res.status(400).json({ message: 'Check-in and check-out dates are required' });
        }
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const overlappingBooking = await Booking_1.default.findOne({
            propertyId: req.params.id,
            status: { $in: ['pending', 'confirmed'] },
            $or: [
                {
                    checkInDate: { $lte: checkOut },
                    checkOutDate: { $gte: checkIn }
                }
            ]
        });
        res.json({ available: !overlappingBooking });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.checkAvailability = checkAvailability;
