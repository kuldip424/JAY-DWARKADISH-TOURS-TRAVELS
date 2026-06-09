const Ride = require('../models/Ride');

exports.requestRide = async (req, res) => {
    try {
        const { pickup, destination, fare } = req.body;
        const ride = await Ride.create({
            user: req.user.id,
            pickup,
            destination,
            fare
        });
        res.status(201).json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRides = async (req, res) => {
    try {
        const query = req.user.role === 'driver' ? { status: 'pending' } : { user: req.user.id };
        const rides = await Ride.find(query).populate('user', 'name phone').sort('-createdAt');
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRideStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (req.user.role === 'driver' && status === 'accepted') {
            ride.driver = req.user.id;
        }

        ride.status = status;
        await ride.save();
        res.json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
