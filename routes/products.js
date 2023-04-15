const express = require('express');
const { Product } = require('../db/models');
const sequelize = require('../db/connection');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while describing the products model.' });
    }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving the products.' });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const product = await Product.create(newProduct);
        res.status(201).json({
            message: 'Product created successfully',
            product: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the product.' });
    }
});

// Update an existing product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product === null) {
            res.status(404).send('Product not found');
        }

        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        await product.save();
        res.status(200).json({
            message: 'Product updated successfully',
            product: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the product.' });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product === null) {
            res.status(404).json({
                message: 'Product not found'
            });
        } else {
            await product.destroy();
            console.log('Product deleted successfully');
            res.status(200).json({
                message: 'Product deleted successfully'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the product.' });
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
