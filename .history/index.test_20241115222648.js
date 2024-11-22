const request = require('supertest');
const { app, server } = require('./index'); 
const getProducts = require('./getProducts'); 


//mock the getProducts Module -- write your code here
jest.mock('./getProducts');


beforeAll((done) => {
    server.listen(5000, done); 
});

afterAll((done) => {
    server.close(done); 
});



//write your describe block here 