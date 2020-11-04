import 'reflect-metadata';
import { Users } from '../orm/entity/user';
import { getConnection, timeout } from './connection';
import { validateLoginInfo, validateRegisterInfo } from '../common/validate';
import server from './server';

server.post('/user/logout', async (req, response) => {
    response.clearCookie('auth');
    response.send({ result: 'success' });
});

server.post('/user/login', async (request, response) => {
    try {
        let loginInfo = request.body;
        validateLoginInfo(loginInfo);

        const conn = getConnection();

        let result = await conn.getRepository(Users)
            .find({ where: { Username: loginInfo.username, PasswordMD5: loginInfo.password } });

        if (result.length > 0) {
            response.cookie('auth', loginInfo.username, { maxAge: 60 * 1000, sameSite: false });
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

        let registerInfo = request.body;

        validateRegisterInfo(registerInfo);

        const conn = getConnection();
        let result = await conn.createQueryBuilder()
            .insert()
            .into("Users")
            .values([{
                Username: registerInfo.username,
                FirstName: registerInfo.firstname,
                LastName: registerInfo.lastname,
                Email: registerInfo.email,
                PasswordMD5: registerInfo.password
            }])
            .execute();

            response.send({ result: 'success' });
    }
    catch (error) {
        if (error instanceof Error)
            response.send({ result: "error", message: error.message });
    }
});

export default server;