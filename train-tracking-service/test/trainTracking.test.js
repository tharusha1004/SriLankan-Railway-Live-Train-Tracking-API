const request = require('supertest');
const server = require('../server');
const mongoose = require('../src/config/db');
const TrainTracking = require('../src/models/trainTracking');

beforeAll(async () => {
    await mongoose.connection.dropDatabase();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Train Tracking Service', () => {
    it('should update train location as admin', async () => {
        const res = await request(server)
            .put('/api/train-location')
            .auth('admin', '123456')
            .send({
                trainId: 'EXP123',
                trainName: 'Express',
                currentStation: 'Station A',
                status: 'On Time'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.trainId).toBe('EXP123');
    });

    it('should get train location for normal user', async () => {
        await TrainTracking.create({
            trainId: 'EXP123',
            trainName: 'Express',
            currentStation: 'Station A',
            status: 'On Time'
        });
        const res = await request(server)
            .get('/api/train-location')
            .query({ trainId: 'EXP123' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.trainId).toBe('EXP123');
    });
});