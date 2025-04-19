const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Protected route example
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // User is available from auth middleware
    const user = req.user;
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      email_verified: user.email_verified
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router; 