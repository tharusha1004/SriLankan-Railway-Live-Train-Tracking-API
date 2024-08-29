const request = require('supertest');
const server = require('../server');
const mongoose = require('mongoose');

describe('GPS Data API', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should add GPS data', async () => {
        const res = await request(server)
            .post('/api/gps-data')
            .auth('admin', '123456')
            .send({
                trainId: '1234',
                location: 'Station A'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should retrieve all GPS data', async () => {
        const res = await request(server)
            .get('/api/gps-data')
            .auth('admin', '123456');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
