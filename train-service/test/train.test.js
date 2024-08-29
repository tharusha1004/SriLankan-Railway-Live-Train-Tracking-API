const request = require('supertest');
const server = require('../server');

describe('Train Service', () => {
    it('should get all trains', async () => {
        const res = await request(server).get('/api/trains');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a train as admin', async () => {
        const res = await request(server)
            .post('/api/trains')
            .auth('admin', '123456')
            .send({
                trainName: 'Express',
                trainId: 'EXP123',
                lane: 'Southern'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.trainName).toBe('Express');
    });

    it('should update a train as admin', async () => {
        const res = await request(server)
            .put('/api/trains/EXP123')
            .auth('admin', '123456')
            .send({
                trainName: 'Express Updated',
                lane: 'Northern'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.trainName).toBe('Express Updated');
    });

    it('should not create a train without admin auth', async () => {
        const res = await request(server)
            .post('/api/trains')
            .send({
                trainName: 'Local',
                trainId: 'LOC456',
                lane: 'Central'
            });
        expect(res.statusCode).toEqual(401);
    });
});
