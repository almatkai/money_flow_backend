const express = require('express');
const router = express.Router();
const passport = require('passport');

// Middleware to require authentication
const requireAuth = passport.authenticate('jwt', { session: false });

// Protected route example
router.get('/profile', requireAuth, (req, res) => {
  res.json({
    message: 'You have access to this protected route',
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      picture: req.user.picture
    }
  });
});

// Another protected route example
router.get('/dashboard', requireAuth, (req, res) => {
  res.json({
    message: 'Dashboard data',
    timestamp: new Date()
  });
});

module.exports = router; 