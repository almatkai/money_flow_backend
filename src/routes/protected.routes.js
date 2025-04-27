const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middleware/auth.middleware');

// Custom middleware for short unauthorized message
// const requireAuth = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user) => {
//     if (err || !user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     req.user = user;
//     next();
//   })(req, res, next);
// };

// User profile controller
const userProfileController = require('../controllers/userprofile.controller');

// Protected route example
router.get('/profile', authMiddleware, userProfileController.getProfile);

router.put('/profile', authMiddleware, userProfileController.updateProfile);

// Another protected route example
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: 'Dashboard data',
    timestamp: new Date()
  });
});

module.exports = router;
