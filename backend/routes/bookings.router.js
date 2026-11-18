import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import protectAdmin from '../middlewares/protectAdmin.js';
import {
  getAllBookings,
  getBookingById,
  getMyBookings,
  patchBookingStatus,
  postBooking,
} from '../controllers/bookings.controller.js';

const router = express.Router();

router.post('/', protectRoute, postBooking);
router.get('/', protectRoute, getMyBookings);
router.get('/admin/all', protectRoute, protectAdmin, getAllBookings); // before '/:id'
router.get('/:id', protectRoute, getBookingById);
router.patch('/:id/status', protectRoute, patchBookingStatus);

export default router;
