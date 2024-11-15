const request = require('supertest');
const { app, server } = require('./server'); /
const getProducts = require('./getProducts'); 


//mock the getProducts Module


beforeAll((done) => {
    server.listen(5000, done); // Start the server before tests run
});

afterAll((done) => {
    server.close(done); // Close the server after tests are done
});