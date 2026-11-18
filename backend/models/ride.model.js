import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'], 
        default: 'pending' 
    },
    fare: { type: Number, required: true },
    distance: { type: String },
    duration: { type: String }
}, { timestamps: true });

export default mongoose.model('Ride', rideSchema);
