import 'reflect-metadata';
import request from 'supertest';
import server from '../index';


describe('Post Endpoints', () => {
    it('should register', async () => {
        const res = await request(server.app)
            .post('/user/register')
            .send({ username: "user1"
                    , firstname: "firstname1"
                    , lastname: "lastname1"
                    , email: "email1@test.ee"
                    , password: "password1" });
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('result');
        expect(res.body.result).toBe('success');
    });

    it('should be able to login when registered', async () => {

        const reg_res = await request(server.app)
            .post('/user/register')
            .send({ username: "user2"
                    , firstname: "firstname1"
                    , lastname: "lastname1"
                    , email: "email1@test.ee"
                    , password: "password2" });
        

        const res = await request(server.app)
            .post('/user/login')
            .send({ username: "user2"
                    , password: "password2" });
                    
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('result');
        expect(res.body.result).toBe('success');
    });
})