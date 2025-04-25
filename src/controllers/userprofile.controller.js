// src/controllers/userprofile.controller.js

const { Profile } = require('../models');
const { Op } = require('sequelize');

// Get current user's profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'picture', 'createdAt', 'updatedAt'],
    });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update current user's name and picture
exports.updateProfile = async (req, res) => {
  try {
    console.log('Update profile request body:', req.body);
    const userId = req.user.id;
    const { name, picture } = req.body;

    const profile = await Profile.findOne({ where: { id: userId } });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (typeof name === 'string') profile.name = name;
    if (typeof picture === 'string') profile.picture = picture;

    await profile.save();

    res.json({
      id: profile.id,
      name: profile.name,
      picture: profile.picture,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
