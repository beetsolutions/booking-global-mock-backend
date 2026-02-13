import express from 'express';
import { getDeals, getDeal } from '../controllers/deal.controller';

const router = express.Router();

router.get('/', getDeals);
router.get('/:id', getDeal);

export default router;
