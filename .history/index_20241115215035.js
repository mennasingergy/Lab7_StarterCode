const express = require('express');
const getProducts = require('./getProducts'); // This will be a mocked module
const app = express();

//create getproducts api here







const server = app.listen(5000, () => {
    console.log('Server running on port 5000');
});

module.exports = { app, server }