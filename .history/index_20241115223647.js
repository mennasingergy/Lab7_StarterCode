const express = require('express');
const getProducts = require('./getProducts'); // This will be a mocked module
const app = express();

//create getproducts api here

app.get('/users', async (req, res) => {
    try {
        const users = await getUsers();  
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send('Error retrieving users');
    }
});


const server = app.listen(4000, () => {
    console.log('Server running on port 4000');
});

module.exports = { app, server }