"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeal = exports.getDeals = void 0;
const Deal_1 = __importDefault(require("../models/Deal"));
// @desc    Get all deals
// @route   GET /api/deals
// @access  Public
const getDeals = async (req, res) => {
    try {
        const deals = await Deal_1.default.find({ isActive: true }).sort({ discount: -1 });
        res.json(deals);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getDeals = getDeals;
// @desc    Get deal by ID
// @route   GET /api/deals/:id
// @access  Public
const getDeal = async (req, res) => {
    try {
        const deal = await Deal_1.default.findById(req.params.id);
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }
        res.json(deal);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getDeal = getDeal;
