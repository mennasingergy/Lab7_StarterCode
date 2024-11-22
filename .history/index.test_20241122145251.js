const request = require('supertest');
const app = require('./index');
const getProducts = require('./getProducts');


// Mock the getProducts module
jest.mock('./getProducts');

let server;

beforeAll((done) => {
    // Start the server only once
    server = app.listen(3000, done); 
});

afterAll((done) => {
    // Close the server after all tests
    server.close(done); 
});

describe('API Tests for /products', () => {
    it('GET /products should return a list of products with the required properties', async () => {

        // Mock the implementation of getProducts to return dummy data
        getProducts.mockResolvedValue([
            { id: 1, name: 'Product A', price: 10.99 },
            { id: 2, name: 'Product B', price: 20.49 },
        ]);

        const response = await request(server).get('/products');

        // Assertions
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);

        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('price');
        }
    });

    it('GET /products should handle server errors', async () => {
        // Simulate an error in getProducts
        getProducts.mockRejectedValue(new Error('Database error'));
        const response = await request(server).get('/products');
        // Assertions
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Error fetching products' });
    });
});
