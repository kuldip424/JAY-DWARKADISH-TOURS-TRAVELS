import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'driver', 'admin'], default: 'user' },
    phone: { type: String },
    isAvailable: { type: Boolean, default: true }, // For drivers
    currentLocation: {
        lat: Number,
        lng: Number
    }
}, { timestamps: true });

// Hash the password whenever it is set or changed
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema);
