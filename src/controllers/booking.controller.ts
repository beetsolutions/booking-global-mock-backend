import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Property from '../models/Property';
import { bookingSchema } from '../utils/validators';
import { AuthRequest } from '../middleware/auth.middleware';

export const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('propertyId')
      .populate('userId', 'firstName lastName email')
      .sort('-createdAt');

    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('propertyId')
      .populate('userId', 'firstName lastName email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = bookingSchema.parse(req.body);

    const property = await Property.findById(validatedData.propertyId);

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
    const overlappingBooking = await Booking.findOne({
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

    const booking = await Booking.create({
      propertyId: validatedData.propertyId,
      userId: req.user._id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests: validatedData.guests,
      totalPrice
    });

    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);

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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const checkAvailability = async (req: Request, res: Response) => {
  try {
    const { checkInDate, checkOutDate } = req.query;

    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({ message: 'Check-in and check-out dates are required' });
    }

    const checkIn = new Date(checkInDate as string);
    const checkOut = new Date(checkOutDate as string);

    const overlappingBooking = await Booking.findOne({
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
