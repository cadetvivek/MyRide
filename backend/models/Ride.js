const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pickup: {
        lat: Number,
        lng: Number
    },
    dropoff: {
        lat: Number,
        lng: Number
    },
    fare: Number,
    status: { type: String, enum: ['Pending', 'Ongoing', 'Completed', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ride', rideSchema);
