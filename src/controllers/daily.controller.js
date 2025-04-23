// src/controllers/daily.controller.js

const { Daily } = require('../models'); // Adjust import if model is named differently

// Create a daily record
async function createDaily(req, res) {
  try {
    const { user_id, name, price, description, image, category } = req.body;
    const daily = await Daily.create({ user_id, name, price, description, image, category });
    res.status(201).json(daily);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get daily records (optionally by user_id)
async function getDailies(req, res) {
  try {
    const { user_id } = req.query;
    const where = user_id ? { user_id } : {};
    const dailies = await Daily.findAll({ where });
    res.json(dailies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a daily record by id
async function deleteDaily(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Daily.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Daily record deleted' });
    } else {
      res.status(404).json({ error: 'Daily record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update price and/or name of a daily record by id
async function updateDaily(req, res) {
  try {
    const { id } = req.params;
    const { price, name } = req.body;
    const [updated] = await Daily.update(
      { price, name },
      { where: { id } }
    );
    if (updated) {
      const updatedDaily = await Daily.findByPk(id);
      res.json(updatedDaily);
    } else {
      res.status(404).json({ error: 'Daily record not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createDaily,
  getDailies,
  deleteDaily,
  updateDaily,
};
