"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDestination = exports.getDestinations = void 0;
const Destination_1 = __importDefault(require("../models/Destination"));
// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
const getDestinations = async (req, res) => {
    try {
        const destinations = await Destination_1.default.find({ isActive: true }).sort({ properties: -1 });
        res.json(destinations);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getDestinations = getDestinations;
// @desc    Get destination by ID
// @route   GET /api/destinations/:id
// @access  Public
const getDestination = async (req, res) => {
    try {
        const destination = await Destination_1.default.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.json(destination);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getDestination = getDestination;
