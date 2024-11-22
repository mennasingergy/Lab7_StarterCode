
const express = require('express');
const app = express();
const getProducts = require('./getProducts');

app.get('/products', async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

// app.listen(4000, () => {
//     console.log('Server running on port 4000');
// });

module.exports = { app }; // Export app for testing purposes
