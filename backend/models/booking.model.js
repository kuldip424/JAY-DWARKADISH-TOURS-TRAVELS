const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['package', 'ride'],
        required: true
    },
    details: {
        packageName: String,
        pickup: String,
        destination: String,
        date: { type: Date, required: true },
        time: String,
        tMode: String, // 'one-way' or 'round'
        carType: String,
        passengers: Number,
    },
    customerInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true }
    },
    fare: {
        total: { type: Number, required: true },
        base: Number,
        allowance: Number
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
