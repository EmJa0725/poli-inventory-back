const express = require('express');
const { Inventory, Product } = require('../db/models');

const router = express.Router();

// Get all inventory items with their product details
router.get('/', async (req, res) => {
  const inventory = await Inventory.findAll();
  res.json(inventory);
});

// Get a specific inventory item by ID with its product details
router.get('/:id', async (req, res) => {
  const inventory = await Inventory.findByPk(req.params.id, {
    include: [{ model: Product }]
  });
  if (!inventory) {
    res.status(404).send('Inventory item not found');
  } else {
    res.json(inventory);
  }
});

// Add a new inventory item
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(400).send('Product not found');
    } else {
      const inventory = await Inventory.create({ productId, quantity });
      res.json(inventory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update an existing inventory item
router.put('/:id', async (req, res) => {
  const { quantity } = req.body;
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    if (!inventory) {
      res.status(404).send('Inventory item not found');
    } else {
      inventory.quantity = quantity || inventory.quantity;
      await inventory.save();
      res.json(inventory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    if (!inventory) {
      res.status(404).send('Inventory item not found');
    } else {
      await inventory.destroy();
      res.send('Inventory item deleted');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;