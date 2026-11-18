const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    duration: { type: String },
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
