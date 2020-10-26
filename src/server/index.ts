import express, { Response } from 'express';
import cors from 'cors';

import {LoginResult} from "../common/response";

const port = 8080;
let app = express();
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

app.post('/login', (req, res: Response<LoginResult>) => {
    res.send({result: 'success'});
});

app.post('/register', (req, res: Response<LoginResult>) => {
    res.send({result: 'success'});
});