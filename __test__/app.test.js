const request = require('supertest');
const app = require('../app'); // assuming this is your Express app instance

describe('Inventory routes', () => {
    it('should return all inventory items with their product details', async () => {
        const res = await request(app).get('/api/inventory');
        expect(res.statusCode).toEqual(200);
        expect(res.type).toBe('application/json');
        // Expect to have min length of 1
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('quantity');
        expect(res.body[0]).toHaveProperty('name');

    });

    it('should update an existing inventory item', async () => {
        const res = await request(app)
            .put('/api/inventory')
            .send([{ id: 1, ['new quantity']: 100, name: 'Adidas Ultraboost 21' }]);
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Inventory items updated successfully');
    });

    it('should return an description of the inventory model', async () => {
        const res = await request(app)
            .options('/api/inventory');
            expect(res.body[0]).toHaveProperty('type');
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0]).toHaveProperty('length');
    });
});

describe('Products routes', () => {
    it('should return all products with their details', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(res.type).toBe('application/json');
        // Expect to have min length of 1
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('description');
        expect(res.body[0]).toHaveProperty('price');
    });

    it('should update an existing product', async () => {
        const res = await request(app)
            .put('/api/products/1')
            .send([{ name: 'Adidas Ultraboost 21' }]);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Product updated successfully');
    });

    it('should return an description of the products model', async () => {
        const res = await request(app)
            .options('/api/products');
            expect(res.body[0]).toHaveProperty('type');
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0]).toHaveProperty('length');
    });
});