// src/controllers/wish.controller.js
const { Wish, ExpenseCategory } = require('../models');

async function createWish(req, res) {
  try {
    const { user_id, name, price, description, link, image, category_id, desire_score } = req.body;
    
    // Verify category exists
    const category = await ExpenseCategory.findByPk(category_id);
    if (!category) {
      return res.status(400).json({ error: 'Invalid category_id' });
    }

    const wish = await Wish.create({ 
      user_id, 
      name, 
      price, 
      description, 
      link, 
      image, 
      category_id, 
      desire_score 
    });
    
    // Include category in response
    const wishWithCategory = await Wish.findByPk(wish.id, {
      include: [{
        model: ExpenseCategory,
        attributes: ['label', 'value']
      }]
    });

    res.status(201).json(wishWithCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getWishes(req, res) {
  try {
    const { user_id } = req.query;
    const where = user_id ? { user_id } : {};
    const wishes = await Wish.findAll({
      where,
      include: [{
        model: ExpenseCategory,
        attributes: ['label', 'value']
      }]
    });
    res.json(wishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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

async function updateWish(req, res) {
  try {
    const { id } = req.params;
    const { price, name, category_id } = req.body;

    // If category_id is being updated, verify it exists
    if (category_id) {
      const category = await ExpenseCategory.findByPk(category_id);
      if (!category) {
        return res.status(400).json({ error: 'Invalid category_id' });
      }
    }

    const [updated] = await Wish.update(
      { price, name, category_id },
      { where: { id } }
    );

    if (updated) {
      const updatedWish = await Wish.findByPk(id, {
        include: [{
          model: ExpenseCategory,
          attributes: ['label', 'value']
        }]
      });
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
