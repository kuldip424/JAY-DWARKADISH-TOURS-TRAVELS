const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    image: { type: String },
    details: [{
        icon: String,
        label: String,
        value: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
