import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties
} from '../controllers/property.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getProperties);
router.get('/search', searchProperties);
router.get('/:id', getProperty);
router.post('/', protect, authorize('host', 'admin'), createProperty);
router.put('/:id', protect, authorize('host', 'admin'), updateProperty);
router.delete('/:id', protect, authorize('host', 'admin'), deleteProperty);

export default router;
