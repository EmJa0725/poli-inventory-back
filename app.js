const express = require('express');

require('dotenv').config();
const app = express();
const port = 8000;

// Import the sequelize connection
const sequelize = require('./db/connection');

console.log('process.env.DATABASE_NAME: ', process.env.DATABASE_NAME);
// Test .env file
if (process.env.DATABASE_NAME) {
    console.log('DATABASE_NAME is set');
} 

// Test the connection
sequelize.authenticate().then(() => {
    console.log('Connection to database has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Import the routes
const productRoutes = require('./routes/products.js');
const inventoryRoutes = require('./routes/inventory.js');

// Use the routes
app.use('/products', productRoutes);
app.use('/inventory', inventoryRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Inventory API listening at http://localhost:${port}`);
});