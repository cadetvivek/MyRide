const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, role });
        res.status(201).send({ token: generateToken(user) });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password))
            return res.status(400).send("Invalid credentials");
        res.send({ token: generateToken(user) });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getProfile = async (req, res) => {
    res.send(req.user);
};
