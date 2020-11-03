import 'reflect-metadata';
import request from 'supertest';
import app from '../index';

describe('Post Endpoints', () => {
    it('should register', async () => {
        const res = await request(app)
            .post('/register')
            .send({ username: "user1"
                    , firstname: "firstname1"
                    , lastname: "lastname1"
                    , email: "email1"
                    , password: "password1" })
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('result');
        expect(res.body.result).toBe('success');
    });
})