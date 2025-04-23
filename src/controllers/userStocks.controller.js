// src/controllers/userStocks.controller.js

const { UserStock } = require('../models'); // Adjust import if model is named differently

// Create a user stock
async function createUserStock(req, res) {
  try {
    const { stock_id, user_id, quantity, stock_price } = req.body;
    const userStock = await UserStock.create({ stock_id, user_id, quantity, stock_price });
    res.status(201).json(userStock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get user stocks (optionally by user_id)
async function getUserStocks(req, res) {
  try {
    const { user_id } = req.query;
    const where = user_id ? { user_id } : {};
    const userStocks = await UserStock.findAll({ where });
    res.json(userStocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a user stock by id
async function deleteUserStock(req, res) {
  try {
    const { id } = req.params;
    const deleted = await UserStock.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'User stock deleted' });
    } else {
      res.status(404).json({ error: 'User stock not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update price and/or name of a user stock by id
async function updateUserStock(req, res) {
  try {
    const { id } = req.params;
    const { stock_price, name } = req.body;
    const [updated] = await UserStock.update(
      { stock_price, name },
      { where: { id } }
    );
    if (updated) {
      const updatedUserStock = await UserStock.findByPk(id);
      res.json(updatedUserStock);
    } else {
      res.status(404).json({ error: 'User stock not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createUserStock,
  getUserStocks,
  deleteUserStock,
  updateUserStock,
};
