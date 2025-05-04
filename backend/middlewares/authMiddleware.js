const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.status(401).send("Access denied");

            const decoded = jwt.verify(token, secret);
            req.user = await User.findById(decoded.id);

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).send("Forbidden");
            }

            next();
        } catch (err) {
            res.status(401).send("Invalid token");
        }
    };
};

module.exports = authMiddleware;
