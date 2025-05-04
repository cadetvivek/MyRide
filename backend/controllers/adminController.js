const Ride = require('../models/Ride');
const User = require('../models/User');

exports.getAllRides = async (req, res) => {
    const rides = await Ride.find().populate('user driver');
    res.send(rides);
};

exports.assignDriver = async (req, res) => {
    const ride = await Ride.findById(req.params.rideId);
    const driver = await User.findById(req.body.driverId);
    if (!ride || !driver) return res.status(404).send("Not found");

    ride.driver = driver._id;
    await ride.save();
    res.send("Driver assigned");
};
