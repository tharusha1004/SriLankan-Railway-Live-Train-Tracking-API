const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Existing routes for user management
router.post('/users', userController.registerUser);
router.get('/users/:username/profile', userController.getUserProfile);
router.put('/users/:username/profile', userController.updateUserProfile);
router.delete('/users/:username', userController.deleteUser);

// New login route
router.post('/login', userController.loginUser);

module.exports = router;
