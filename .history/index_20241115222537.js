const express = require('express');
const getProducts = require('./getProducts'); // This will be a mocked module
const app = express();

//create getproducts api here








const server = app.listen(4000, () => {
    console.log('Server running on port 4000');
});

module.exports = { app, server }