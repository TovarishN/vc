import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { RequestResult } from '../common/response';
import { LoginInfo, RegisterInfo } from '../common/request';
import { getConnection } from 'typeorm';
import { Users } from '../orm/entity/user';
import path from 'path';
import cookieParser from 'cookie-parser';
import { apiHost, apiPort } from '../common/server_settings';
import { dbConnectionName, timeout, waitForConnection } from './waitForConnection';

let app = express();

waitForConnection();

app.use(cors({
    credentials: true
    , origin: (or, cb) => { cb(null, true); }
    , preflightContinue: true
}));

app.use(express.json());
app.use(cookieParser());

let env = process.env['NODE_ENV'];
console.log(process.env['NODE_ENV']);
if (env !== 'development') {
    let serveStaticPath = path.join(__dirname, '../client/');
    console.log(`serve client at ${serveStaticPath}`);
    app.use(express.static(serveStaticPath));
}

app.listen(apiPort, () => {
    console.log(`server started at http://${apiHost}:${apiPort}`);
});

app.post('/logout', async (req, response: Response<RequestResult>) => {
    let cookies = req.cookies;

    response.clearCookie('auth');
    response.send({ result: 'success' });
});

app.post('/login', async (request: Request<{}, {}, LoginInfo>, response: Response<RequestResult>) => {
    try {
        let login = request.body;
        const conn = getConnection(dbConnectionName);

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

app.post('/register', async (request: Request<{}, {}, RegisterInfo>, response: Response<RequestResult>) => {

    try {
        await timeout(3000);

        let userInfo = request.body;

        const conn = getConnection(dbConnectionName);
        let result = await conn.createQueryBuilder()
            .insert()
            .into(Users)
            .values([{
                Username: userInfo.username,
                FirstName: userInfo.firstname,
                LastName: userInfo.lastname,
                Email: userInfo.email,
                PasswordMD5: userInfo.password
            }])
            .execute();

        response.send({ result: 'error', message: 'somthing bad happened' });
    }
    catch (error) {
        if (error instanceof Error)
            response.send({ result: "error", message: error.message });
    }
});
