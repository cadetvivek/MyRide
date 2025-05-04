const User = require('../models/User');

const driverMatcher = async (pickup) => {
    const drivers = await User.find({ role: 'Driver', isAvailable: true });
    let nearest = null;
    let minDist = Infinity;

    drivers.forEach(driver => {
        const dist = Math.sqrt(
            Math.pow(pickup.lat - driver.location.lat, 2) +
            Math.pow(pickup.lng - driver.location.lng, 2)
        );
        if (dist < minDist) {
            minDist = dist;
            nearest = driver;
        }
    });

    return nearest;
};

module.exports = driverMatcher;
