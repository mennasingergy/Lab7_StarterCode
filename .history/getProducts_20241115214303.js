// getProducts.js
module.exports = async function getProducts() {
    // In a real scenario, this function would fetch products from a database or API
    return [
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Smartphone', price: 500 },
        { id: 3, name: 'Headphones', price: 100 },
    ];
};
