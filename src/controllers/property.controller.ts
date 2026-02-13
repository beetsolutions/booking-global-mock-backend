import { Request, Response } from 'express';
import Property from '../models/Property';
import { propertySchema } from '../utils/validators';
import { AuthRequest } from '../middleware/auth.middleware';

export const getProperties = async (req: Request, res: Response) => {
  try {
    const {
      city,
      country,
      propertyType,
      minPrice,
      maxPrice,
      guests,
      amenities,
      page = 1,
      limit = 10,
      sort = '-createdAt'
    } = req.query;

    const query: any = { isActive: true };

    if (city) query.city = { $regex: city, $options: 'i' };
    if (country) query.country = { $regex: country, $options: 'i' };
    if (propertyType) query.propertyType = propertyType;
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }
    if (guests) query.maxGuests = { $gte: Number(guests) };
    if (amenities) {
      const amenitiesArray = typeof amenities === 'string' ? amenities.split(',') : amenities;
      query.amenities = { $all: amenitiesArray };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(query)
      .populate('hostId', 'firstName lastName email')
      .sort(sort as string)
      .skip(skip)
      .limit(Number(limit));

    const total = await Property.countDocuments(query);

    res.json({
      properties,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      total
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id).populate('hostId', 'firstName lastName email phone');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProperty = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = propertySchema.parse(req.body);

    const property = await Property.create({
      ...validatedData,
      hostId: req.user._id
    });

    res.status(201).json(property);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProperty = async (req: AuthRequest, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.hostId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    const validatedData = propertySchema.partial().parse(req.body);

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );

    res.json(updatedProperty);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProperty = async (req: AuthRequest, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.hostId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({ message: 'Property removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const searchProperties = async (req: Request, res: Response) => {
  try {
    const { query, ...filters } = req.query;

    const searchQuery: any = { isActive: true };

    if (query) {
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } },
        { country: { $regex: query, $options: 'i' } }
      ];
    }

    const properties = await Property.find(searchQuery)
      .populate('hostId', 'firstName lastName')
      .limit(20);

    res.json(properties);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
