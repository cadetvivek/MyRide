const Ride = require('../models/Ride');
const User = require('../models/User');
const driverMatcher = require('../utils/driverMatcher');

exports.bookRide = async (req, res) => {
    try {
        const { pickup, dropoff } = req.body;
        
        // Validate pickup and dropoff locations
        if (!pickup || !dropoff || !pickup.lat || !pickup.lng || !dropoff.lat || !dropoff.lng) {
            return res.status(400).json({ error: 'Invalid pickup or dropoff locations' });
        }

        const driver = await driverMatcher(pickup);
        
        const distance = Math.sqrt(
            Math.pow(pickup.lat - dropoff.lat, 2) + Math.pow(pickup.lng - dropoff.lng, 2)
        );
        const fare = distance * 10;

        const ride = await Ride.create({
            user: req.user._id,
            driver: driver._id,
            pickup,
            dropoff,
            fare,
            status: 'Pending'
        });

        driver.isAvailable = false;
        await driver.save();

        res.status(201).json(ride);
    } catch (err) {
        // Send specific error messages to the client
        res.status(404).json({ error: err.message });
    }
};

exports.getRide = async (req, res) => {
    const ride = await Ride.findById(req.params.id).populate('driver user');
    if (!ride) return res.status(404).send("Ride not found");
    res.send(ride);
};

exports.cancelRide = async (req, res) => {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).send("Ride not found");
    ride.status = 'Cancelled';
    await ride.save();
    res.send("Ride cancelled");
};

exports.completeRide = async (req, res) => {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).send("Ride not found");
    ride.status = 'Completed';
    await ride.save();

    const driver = await User.findById(ride.driver);
    driver.isAvailable = true;
    await driver.save();

    res.send("Ride completed");
};

exports.updateLocation = async (req, res) => {
    const { lat, lng } = req.body;
    req.user.location = { lat, lng };
    await req.user.save();
    res.send("Location updated");
};
