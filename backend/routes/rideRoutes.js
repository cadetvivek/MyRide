const express = require('express');
const router = express.Router();
const ride = require('../controllers/rideController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/book', authMiddleware(['User']), ride.bookRide);
router.get('/:id', authMiddleware(), ride.getRide);
router.post('/cancel/:id', authMiddleware(['User']), ride.cancelRide);
router.post('/complete/:id', authMiddleware(['Driver']), ride.completeRide);
router.post('/update-location', authMiddleware(['Driver']), ride.updateLocation);

module.exports = router;
