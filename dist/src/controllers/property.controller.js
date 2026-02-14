"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProperties = exports.deleteProperty = exports.updateProperty = exports.createProperty = exports.getProperty = exports.getProperties = void 0;
const Property_1 = __importDefault(require("../models/Property"));
const validators_1 = require("../utils/validators");
const getProperties = async (req, res) => {
    try {
        const { city, country, propertyType, minPrice, maxPrice, guests, amenities, page = 1, limit = 10, sort = '-createdAt' } = req.query;
        const query = { isActive: true };
        if (city)
            query.city = { $regex: city, $options: 'i' };
        if (country)
            query.country = { $regex: country, $options: 'i' };
        if (propertyType)
            query.propertyType = propertyType;
        if (minPrice || maxPrice) {
            query.pricePerNight = {};
            if (minPrice)
                query.pricePerNight.$gte = Number(minPrice);
            if (maxPrice)
                query.pricePerNight.$lte = Number(maxPrice);
        }
        if (guests)
            query.maxGuests = { $gte: Number(guests) };
        if (amenities) {
            const amenitiesArray = typeof amenities === 'string' ? amenities.split(',') : amenities;
            query.amenities = { $all: amenitiesArray };
        }
        const skip = (Number(page) - 1) * Number(limit);
        const properties = await Property_1.default.find(query)
            .populate('hostId', 'firstName lastName email')
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));
        const total = await Property_1.default.countDocuments(query);
        res.json({
            properties,
            currentPage: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            total
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProperties = getProperties;
const getProperty = async (req, res) => {
    try {
        const property = await Property_1.default.findById(req.params.id).populate('hostId', 'firstName lastName email phone');
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProperty = getProperty;
const createProperty = async (req, res) => {
    try {
        const validatedData = validators_1.propertySchema.parse(req.body);
        const property = await Property_1.default.create({
            ...validatedData,
            hostId: req.user._id
        });
        res.status(201).json(property);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createProperty = createProperty;
const updateProperty = async (req, res) => {
    try {
        const property = await Property_1.default.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        if (property.hostId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this property' });
        }
        const validatedData = validators_1.propertySchema.partial().parse(req.body);
        const updatedProperty = await Property_1.default.findByIdAndUpdate(req.params.id, validatedData, { new: true, runValidators: true });
        res.json(updatedProperty);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateProperty = updateProperty;
const deleteProperty = async (req, res) => {
    try {
        const property = await Property_1.default.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        if (property.hostId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this property' });
        }
        await Property_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Property removed' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteProperty = deleteProperty;
const searchProperties = async (req, res) => {
    try {
        const { query, ...filters } = req.query;
        const searchQuery = { isActive: true };
        if (query) {
            searchQuery.$or = [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { city: { $regex: query, $options: 'i' } },
                { country: { $regex: query, $options: 'i' } }
            ];
        }
        const properties = await Property_1.default.find(searchQuery)
            .populate('hostId', 'firstName lastName')
            .limit(20);
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.searchProperties = searchProperties;
