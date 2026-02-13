import express from 'express';
import {
  getPropertyReviews,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/review.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/property/:id', getPropertyReviews);
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
