const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { email, password, isAdmin } = req.body;

    try {
        const user = new User({ email, password, isAdmin });
        await user.save();
        res.status(201).json({ message: 'Registered Successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to register user' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ access: token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};