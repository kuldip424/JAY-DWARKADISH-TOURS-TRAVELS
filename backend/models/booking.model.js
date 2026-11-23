import mongoose from 'mongoose';

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
        tMode: String, // 'oneway' or 'round'
        distanceKm: Number, // what the ride fare was worked out from
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

// The queries we run: a user's own list, the admin list (all or by status)
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ createdAt: -1 });

export default mongoose.model('Booking', bookingSchema);
