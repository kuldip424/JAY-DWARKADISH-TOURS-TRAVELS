const express = require('express');
const router = express.Router();
const { 
    createBooking, 
    getMyBookings, 
    getBookingById, 
    updateBookingStatus,
    getAllBookings
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
    .post(protect, createBooking)
    .get(protect, getMyBookings);

router.route('/admin/all')
    .get(protect, admin, getAllBookings);

router.route('/:id')
    .get(protect, getBookingById);

router.route('/:id/status')
    .patch(protect, updateBookingStatus);

module.exports = router;
