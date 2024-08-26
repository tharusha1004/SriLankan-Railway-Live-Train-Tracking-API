const userModel = require('../models/user');
const { generateToken } = require('../config/auth');
const { publishMessage } = require('../services/rabbitmqService');

// Register a new user
const registerUser = async (req, res) => {
    const { username, password, profile } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new userModel({ username, password, profile });
        await user.save();

        const token = generateToken(user);
        publishMessage('userQueue', JSON.stringify({ action: 'register', user }));

        res.status(201).json({ token });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User login
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        publishMessage('userQueue', JSON.stringify({ action: 'login', user }));

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { fullName, email } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user.profile.fullName = fullName || user.profile.fullName;
        user.profile.email = email || user.profile.email;

        await user.save();
        publishMessage('userQueue', JSON.stringify({ action: 'updateProfile', user }));

        res.json({ message: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        publishMessage('userQueue', JSON.stringify({ action: 'deleteUser', user }));
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, updateUserProfile, deleteUserProfile };
