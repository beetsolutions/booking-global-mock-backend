import express from 'express';
import { getDestinations, getDestination } from '../controllers/destination.controller';

const router = express.Router();

router.get('/', getDestinations);
router.get('/:id', getDestination);

export default router;
