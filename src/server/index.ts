import 'reflect-metadata';
import express, { Response } from 'express';
import cors from 'cors';
import { LoginResult } from "../common/response";
import { Connection, createConnection, getConnection, getConnectionManager } from 'typeorm';
import { Users } from "../orm/entity/user";

const port = 8080;
let app = express();
app.use(cors());
app.use(express.json());

(async () => {
    await createConnection();
})();

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

app.post('/login', async (req, res: Response<LoginResult>) => {
    res.send({ result: 'success' });
    try {
        // const conn = await createConnection({
        //     name: "dafault",
        //     type: "mysql",
        //     port: 3306,
        //     host: "localhost",
        //     username: "root",
        //     password: "example",
        //     database: "test",
        //     entities: [Users]
        // });

        const conn = getConnection();

        let r = await conn.query(`
CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(40) NULL
)
ENGINE = INNODB;
`);

        const meta = conn.getMetadata(Users);

        let r2 = await conn.createQueryBuilder()
            .insert()
            .into(Users)
            .values([{ name: "aaaas" }])
            .execute();

        //let query = r2.getQuery();

        let a = 0;
    }
    catch (error) {
        console.log(error);
        let b = 0;
    }

});

app.post('/register', (req, res: Response<LoginResult>) => {
    res.send({ result: 'success' });
});