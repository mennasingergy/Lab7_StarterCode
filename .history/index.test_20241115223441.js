// server.test.js
const request = require('supertest');
const { app, server } = require('./index'); // Import the app and server
const getProducts = require('./getProducts'); // Import the getProducts module

// Mock the getProducts module
jest.mock('./getProducts');

beforeAll((done) => {
    server.listen(5000, done); 
});

afterAll((done) => {
    server.close(done); 
});

describe('Product API', () => {
    it('GET /products should return a list of products with the required properties', async () => {
        getProducts.mockResolvedValue([
            { id: 1, name: 'Laptop', price: 1000 },
            { id: 2, name: 'Smartphone', price: 500 },
            { id: 3, name: 'Headphones', price: 100 },
        ]);

        const response = await request(app).get('/products'); 
       
        expect(response.status).toBe(200);


        expect(Array.isArray(response.body)).toBe(true);

        // Check that the response body has the correct number of products
        expect(response.body.length).toBe(3);

        // Check that each product has the required properties
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('price');
    });

    it('GET /products should handle errors if getProducts fails', async () => {
        // Mock getProducts to throw an error
        getProducts.mockRejectedValue(new Error('Failed to fetch products'));

        const response = await request(app).get('/products'); // Send GET request to /products

        // Check that the status code is 500 (server error)
        expect(response.status).toBe(500);
        expect(response.text).toBe('Error fetching products');
    });
});
