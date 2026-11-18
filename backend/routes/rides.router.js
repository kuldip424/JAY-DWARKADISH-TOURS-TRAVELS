import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { getRides, postRide, putRideStatus } from '../controllers/rides.controller.js';

const router = express.Router();

router.post('/', protectRoute, postRide);
router.get('/', protectRoute, getRides);
router.put('/:id', protectRoute, putRideStatus);

export default router;
