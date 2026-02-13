import { Request, Response } from 'express';
import Destination from '../models/Destination';

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
export const getDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await Destination.find({ isActive: true }).sort({ properties: -1 });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get destination by ID
// @route   GET /api/destinations/:id
// @access  Public
export const getDestination = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
