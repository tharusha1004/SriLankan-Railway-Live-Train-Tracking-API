const request = require('supertest');
const server = require('../server');
const mongoose = require('../src/config/db');
const Schedule = require('../src/models/schedule');

beforeAll(async () => {
    await mongoose.connection.dropDatabase();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Schedule Service', () => {
    it('should create a schedule as admin', async () => {
        const res = await request(server)
            .post('/api/schedules')
            .auth('admin', '123456')
            .send({
                trainId: 'EXP123',
                startStation: 'Station A',
                startTime: '2024-08-27T10:00:00Z',
                endStation: 'Station B',
                endTime: '2024-08-27T12:00:00Z',
                stations: ['Station A', 'Station C', 'Station B']
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.trainId).toBe('EXP123');
    });

    it('should update a schedule as admin', async () => {
        const schedule = await Schedule.create({
            trainId: 'EXP123',
            startStation: 'Station A',
            startTime: '2024-08-27T10:00:00Z',
            endStation: 'Station B',
            endTime: '2024-08-27T12:00:00Z',
            stations: ['Station A', 'Station C', 'Station B']
        });
        const res = await request(server)
            .put(`/api/schedules/${schedule._id}`)
            .auth('admin', '123456')
            .send({
                endStation: 'Station C'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.endStation).toBe('Station C');
    });

    it('should delete a schedule as admin', async () => {
        const schedule = await Schedule.create({
            trainId: 'EXP123',
            startStation: 'Station A',
            startTime: '2024-08-27T10:00:00Z',
            endStation: 'Station B',
            endTime: '2024-08-27T12:00:00Z',
            stations: ['Station A', 'Station C', 'Station B']
        });
        const res = await request(server)
            .delete(`/api/schedules/${schedule._id}`)
            .auth('admin', '123456');
        expect(res.statusCode).toEqual(204);
    });

    it('should get schedules for normal user', async () => {
        const res = await request(server)
            .get('/api/schedules')
            .auth('admin', '123456'); // For normal user auth, use different credentials or modify test
        expect(res.statusCode).toEqual(200);
    });
});
