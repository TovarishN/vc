import 'reflect-metadata';
import { Users } from '../orm/entity/user';
import { getConnection, timeout } from './connection';
import server from './server';

server.post('/user/logout', async (req, response) => {
    response.clearCookie('auth');
    response.send({ result: 'success' });
});

server.post('/user/login', async (request, response) => {
    try {
        let login = request.body;
        const conn = getConnection();

        let result = await conn.getRepository(Users)
            .find({ where: { Username: login.username, PasswordMD5: login.password } });

        if (result.length > 0) {
            response.cookie('auth', login.username, { maxAge: 60 * 1000, sameSite: false });
            response.send({ result: "success" });
        }
        else
            response.send({ result: "error", message: "incorrect credentials" });
    }
    catch (error) {
        if (error instanceof Error)
            response.send({ result: "error", message: error.message });
    }
});

server.post('/user/register', async (request, response) => {

    try {
        await timeout(3000);

        let userInfo = request.body;

        const conn = getConnection();
        let result = await conn.createQueryBuilder()
            .insert()
            .into("Users")
            .values([{
                Username: userInfo.username,
                FirstName: userInfo.firstname,
                LastName: userInfo.lastname,
                Email: userInfo.email,
                PasswordMD5: userInfo.password
            }])
            .execute();

        let a = result;
        response.send({ result: 'success' });
    }
    catch (error) {
        if (error instanceof Error)
            response.send({ result: "error", message: error.message });
    }
});

export default server;