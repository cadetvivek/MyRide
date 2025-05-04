const User = require('../models/User');

const driverMatcher = async (pickup) => {
    try {
        // First, check if there are any drivers in the system
        const totalDrivers = await User.countDocuments({ role: 'Driver' });
        if (totalDrivers === 0) {
            throw new Error('No drivers are registered in the system');
        }

        // Get all available drivers
        const drivers = await User.find({ 
            role: 'Driver', 
            isAvailable: true,
            location: { $exists: true } // Ensure driver has location set
        });

        if (drivers.length === 0) {
            throw new Error('All drivers are currently busy. Please try again later.');
        }

        // Find the nearest driver
        let nearest = null;
        let minDist = Infinity;

        drivers.forEach(driver => {
            if (!driver.location) return; // Skip drivers without location
            
            const dist = Math.sqrt(
                Math.pow(pickup.lat - driver.location.lat, 2) +
                Math.pow(pickup.lng - driver.location.lng, 2)
            );
            
            // Set a maximum distance of 50km (adjust as needed)
            if (dist < minDist && dist < 50) {
                minDist = dist;
                nearest = driver;
            }
        });

        if (!nearest) {
            throw new Error('No drivers available in your area. Please try again later.');
        }

        return nearest;
    } catch (error) {
        throw error;
    }
};

module.exports = driverMatcher;
