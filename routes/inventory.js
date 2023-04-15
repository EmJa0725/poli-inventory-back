const express = require('express');
const { Inventory, Product } = require('../db/models');
const sequelize = require('../db/connection');
const router = express.Router();

// Get all inventory items with their product details
router.get('/', async (req, res) => {
  // const inventory = await Inventory.findAll();
  // instead id, return the product name from the product table 
  const inventory = await Inventory.findAll({
    include: [{ model: Product, attributes: ['name'] }],
    attributes: ['id', 'quantity']
  });

  const modifiedInventory = inventory.map(item => ({
    id: item.id,
    quantity: item.quantity,
    name: item.Product.name
  }));

  res.json(modifiedInventory);
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
      res.status(200).json({
        message: 'Inventory item updated successfully', 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update multiple inventory items
router.put('/', async (req, res) => {
  const itemsToUpdate = req.body;
  const updatedItems = [];
  try {
    for (const item of itemsToUpdate) {
      const inventoryItem = await Inventory.findByPk(item.id);
      if (inventoryItem === null) {
        res.status(404).send(`Inventory item with id ${item.id} not found`);
        return;
      }
      const oldQuantity = inventoryItem.quantity;
      inventoryItem.quantity = item['new quantity'];
      await inventoryItem.save();
      updatedItems.push({
        id: inventoryItem.id,
        name: item.name,
        'old quantity': oldQuantity,
        'new quantity': inventoryItem.quantity
      });
    }
    res.json({
      message: 'Inventory items updated successfully',
      updatedItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while updating the inventory items.'
    })
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


router.options('/', async (req, res) => {
  try {
    const tableName = 'inventory'
    const tableColumns = await sequelize.query(`DESCRIBE ${tableName}`)
    const columns = tableColumns[0].map(column => {
      // Avoid id column
      if (column.Field !== 'id') {
        const type = column.Type.match(/^(?<type>\w+)(\((?<length>\d+)\))?/);
        return {
          name: column.Field,
          type: type.groups.type,
          length: type.groups.length || null,
        }
      }
    }).filter(Boolean); // Remove falsy values
    res.status(200).json(columns);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while fetching the table columns.' });
  }
});


module.exports = router;