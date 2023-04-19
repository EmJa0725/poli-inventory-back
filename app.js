const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app = express();
// Import the sequelize connection
const sequelize = require('./db/connection');

// Test .env file
if (process.env.ENVIROMENT) {
    console.log('Environment variables loaded successfully.');
    console.log('Environment: ' + process.env.ENVIROMENT);
}
const port = process.env.APP_PORT || 3000;

// Test the connection
sequelize.authenticate().then(() => {
    console.log('Connection to database has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Enable CORS
app.use(cors({
    "origin": "http://localhost:3000",
    "preflightContinue": true,
}));

// Import the routes
const productRoutes = require('./routes/products.js');
const inventoryRoutes = require('./routes/inventory.js');

// Use json body parser
app.use(express.json());
// Add prefix api to all routes
// Use the routes
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Inventory API listening at http://localhost:${port}`);
});

module.exports = app;