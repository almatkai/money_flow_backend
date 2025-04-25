const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// User profile controller
const userProfileController = require('../controllers/userprofile.controller');

// Get current user's profile
router.get('/profile', authMiddleware, userProfileController.getProfile);

// Update current user's profile (name, picture)
router.put('/profile', authMiddleware, userProfileController.updateProfile);

module.exports = router;
