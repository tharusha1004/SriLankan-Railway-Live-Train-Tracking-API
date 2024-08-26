const express = require('express');
const router = express.Router();
const { authToken } = require('../config/auth');
const { registerUser, loginUser, updateUserProfile, deleteUserProfile } = require('../controllers/userController');

// Admin login route
router.post('/admin/login', loginUser);

// Normal user login route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authToken, updateUserProfile);
router.delete('/delete-profile', authToken, deleteUserProfile);

module.exports = router;