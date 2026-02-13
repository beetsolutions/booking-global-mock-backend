import { Request, Response } from 'express';
import Deal from '../models/Deal';

// @desc    Get all deals
// @route   GET /api/deals
// @access  Public
export const getDeals = async (req: Request, res: Response) => {
  try {
    const deals = await Deal.find({ isActive: true }).sort({ discount: -1 });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get deal by ID
// @route   GET /api/deals/:id
// @access  Public
export const getDeal = async (req: Request, res: Response) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
