
const express = require('express');
const app = express();
const getProducts= require('./getProducts');
app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const products = await getProducts(); // Get products from the mocked module
        res.status(200).json(products); // Return the products in JSON format
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});

module.exports = { app }; // Export app for testing purposes
