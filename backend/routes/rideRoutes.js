const express = require('express');
const router = express.Router();
const { requestRide, getRides, updateRideStatus } = require('../controllers/rideController');
const { protect } = require('../middleware/auth');

router.route('/')
    .post(protect, requestRide)
    .get(protect, getRides);

router.route('/:id')
    .put(protect, updateRideStatus);

module.exports = router;
