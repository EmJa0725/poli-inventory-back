const express = require('express');
const { Product } = require('../db/models');

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

module.exports = router;
