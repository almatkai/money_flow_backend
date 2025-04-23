// src/controllers/wish.controller.js

const { Wish } = require('../models'); // Adjust import if model is named differently

// Create a wish
async function createWish(req, res) {
  try {
    const { user_id, name, price, description, link, image, category, desire_score } = req.body;
    const wish = await Wish.create({ user_id, name, price, description, link, image, category, desire_score });
    res.status(201).json(wish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get wishes (optionally by user_id)
async function getWishes(req, res) {
  try {
    const { user_id } = req.query;
    const where = user_id ? { user_id } : {};
    const wishes = await Wish.findAll({ where });
    res.json(wishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a wish by id
async function deleteWish(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Wish.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Wish deleted' });
    } else {
      res.status(404).json({ error: 'Wish not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update price and/or name of a wish by id
async function updateWish(req, res) {
  try {
    const { id } = req.params;
    const { price, name } = req.body;
    const [updated] = await Wish.update(
      { price, name },
      { where: { id } }
    );
    if (updated) {
      const updatedWish = await Wish.findByPk(id);
      res.json(updatedWish);
    } else {
      res.status(404).json({ error: 'Wish not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createWish,
  getWishes,
  deleteWish,
  updateWish,
};
