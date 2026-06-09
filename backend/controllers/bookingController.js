const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
    try {
        const { type, details, customerInfo, fare } = req.body;

        if (!details || !customerInfo || !fare) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const booking = await Booking.create({
            user: req.user.id,
            type,
            details,
            customerInfo,
            fare
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all user bookings
// @route   GET /api/bookings
// @access  Private
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).sort('-createdAt');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check ownership
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private (Admin only or user for cancellation)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Only admin can confirm/complete, user can only cancel
        if (status === 'cancelled' && booking.user.toString() === req.user.id) {
            booking.status = 'cancelled';
        } else if (req.user.role === 'admin') {
            booking.status = status;
        } else {
            return res.status(401).json({ message: 'Not authorized to perform this action' });
        }

        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings/admin/all
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'name email').sort('-createdAt');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
