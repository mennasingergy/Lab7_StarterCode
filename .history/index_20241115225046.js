
const express = require('express');
const app = express();

app.get('/products', async (req, res) => {
    try {
        const products = await getProducts(); // Get products from the mocked module
        res.status(200).json(products); // Return the products in JSON format
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

const server = app.listen(4000, () => {
    console.log('Server running on port 4000');
});

module.exports = { app, server }; // Export app for testing purposes
