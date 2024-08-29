const request = require('supertest');
const server = require('../server');
const mongoose = require('../src/config/db');
const Engine = require('../src/models/engine');

beforeAll(async () => {
    await mongoose.connection.dropDatabase();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Engine Management Service', () => {
    it('should create or update engine status as admin', async () => {
        const res = await request(server)
            .post('/api/engine-status')
            .auth('admin', '123456')
            .send({
                engineId: 'ENG001',
                status: 'Operational',
                currentStation: 'Station A',
                delayTime: 10
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.engineId).toBe('ENG001');
    });

    it('should get engine status for normal user', async () => {
        await Engine.create({
            engineId: 'ENG001',
            status: 'Operational',
            currentStation: 'Station A',
            delayTime: 10
        });
        const res = await request(server)
            .get('/api/engine-status')
            .query({ engineId: 'ENG001' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.engineId).toBe('ENG001');
    });
});