const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['User', 'Driver', 'Admin'], default: 'User' },
    location: {
        lat: Number,
        lng: Number
    },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);
