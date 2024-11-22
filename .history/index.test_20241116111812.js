const request = require('supertest');
const { app } = require('./index');
const getProducts = require('./getProducts');

// Mock the getProducts module
jest.mock('./getProducts');

describe('API Tests for /products', () => {
    it('GET /products should return a list of products with the required properties', async () => {
        // Mock the implementation of getProducts to return dummy data
        const mockProducts = [
            { id: 1, name: 'Laptop', price: 1000 },
            { id: 2, name: 'Smartphone', price: 500 },
        ];
        getProducts.mockResolvedValue(mockProducts);

        // Make a request to the endpoint
        const response = await request(app).get('/products');

        // Check response status code
        expect(response.status).toBe(200);

        // Check response content type
        expect(response.headers['content-type']).toMatch(/json/);

        // Check if response body is an array
        expect(Array.isArray(response.body)).toBe(true);

        // Validate the structure of the objects in the response array
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('price');
        }
    });

    it('GET /products should handle server errors gracefully', async () => {
        // Simulate a server error by rejecting the mock
        getProducts.mockRejectedValue(new Error('Database error'));

        // Make a request to the endpoint
        const response = await request(app).get('/products');

        // Check response status code
        expect(response.status).toBe(500);

        // Validate the error message
        expect(response.body).toEqual({ message: 'Server error' });
    });
});

