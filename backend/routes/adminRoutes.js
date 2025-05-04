const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/rides', authMiddleware(['Admin']), admin.getAllRides);
router.post('/assign-driver/:rideId', authMiddleware(['Admin']), admin.assignDriver);

module.exports = router;
