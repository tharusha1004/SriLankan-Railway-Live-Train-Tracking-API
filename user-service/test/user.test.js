const request = require('supertest');
const server = require('../server');

describe('User Login', () => {
    it('should login the admin user', async () => {
        const res = await request(server)
            .post('/api/login')
            .send({ username: 'admin', password: '123456' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Admin logged in successfully');
    });

    it('should login a normal user', async () => {
        const res = await request(server)
            .post('/api/login')
            .send({ username: 'testuser', password: 'testpassword' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('User logged in successfully');
    });

    it('should not login with invalid credentials', async () => {
        const res = await request(server)
            .post('/api/login')
            .send({ username: 'wronguser', password: 'wrongpassword' });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toBe('Invalid credentials');
    });
});
