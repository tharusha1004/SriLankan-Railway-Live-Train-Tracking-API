const User = require('../models/user');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin
        if (username === 'admin' && password === '123456') {
            logger.info('Admin logged in successfully');
            return res.status(200).send({ message: 'Admin logged in successfully' });
        }

        // Check if normal user
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            logger.info(`User ${username} logged in successfully`);
            return res.status(200).send({ message: 'User logged in successfully' });
        }

        logger.warn(`Login failed for user: ${username}`);
        res.status(401).send({ message: 'Invalid credentials' });
    } catch (error) {
        logger.error('Error during login: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        logger.info(`User ${user.username} registered successfully`);
        res.status(201).send(user);
    } catch (error) {
        logger.error('Error registering user: ' + error.message);
        res.status(400).send(error);
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user.profile);
    } catch (error) {
        logger.error('Error retrieving user profile: ' + error.message);
        res.status(500).send(error);
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { username: req.params.username },
            { $set: { profile: req.body } },
            { new: true }
        );
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        logger.info(`User ${user.username} updated profile successfully`);
        res.status(200).send(user.profile);
    } catch (error) {
        logger.error('Error updating user profile: ' + error.message);
        res.status(500).send(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ username: req.params.username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        logger.info(`User ${user.username} deleted successfully`);
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error('Error deleting user: ' + error.message);
        res.status(500).send(error);
    }
};
