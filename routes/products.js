const express = require('express');
const { Product } = require('../db/models');
const sequelize = require('../db/connection');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        res.status(404).send('Product not found');
    } else {
        res.json(product);
    }
});

// Add a new product
router.post('/', async (req, res) => {
    const newProduct = req.body;
    const product = await Product.create(newProduct);
    res.json(product);
});

// Update an existing product
router.put('/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        res.status(404).send('Product not found');
    } else {
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        await product.save();
        res.json(product);
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        res.status(404).send('Product not found');
    } else {
        await product.destroy();
        res.send('Product deleted');
    }
});

router.options('/', async (req, res) => {
    try {
        const tableName = 'products'
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
