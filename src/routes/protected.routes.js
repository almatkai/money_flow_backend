const express = require('express');
const router = express.Router();
const passport = require('passport');

// Custom middleware for short unauthorized message
const requireAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// User profile controller
const userProfileController = require('../controllers/userprofile.controller');

// Protected route example
router.get('/profile', requireAuth, userProfileController.getProfile);

router.put('/profile', requireAuth, userProfileController.updateProfile);

// Another protected route example
router.get('/dashboard', requireAuth, (req, res) => {
  res.json({
    message: 'Dashboard data',
    timestamp: new Date()
  });
});

module.exports = router;
