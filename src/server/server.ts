import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import { RequestResult } from '../common/response';
import { AppRoute, MapRouteToRequestBody } from '../common/routemap';
import { apiHost, apiPort } from '../common/server_settings';
import { waitForConnection } from './connection';

const app = express();

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

app.listen(apiPort, async () => {
	await waitForConnection();
	console.log(`server started at http://${apiHost}:${apiPort}`);
});

export class AppServer {
	private _app: Express;

	get app(): Express { return this._app; } // TODO: only for test purposes. find out: how to test without it

	constructor(app: Express) {
		this._app = app;
	}

	public post<TRoute extends AppRoute>(route: TRoute
		, handler: (req: Request<{}, {}, MapRouteToRequestBody<TRoute>>, res: Response<RequestResult>) => void) {
		this._app.post(route, handler);
	}
}

const server = new AppServer(app);

export default server;