import * as React from 'react';
import App from '../../Web/App';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { html } from '../html';
import * as cors from 'cors';
//const parameters = require('../../../configs/parameters');

export const createStaticServer = (
	app: express.Application,
	staticPath: string,
) => {
	app.use(cors());
	app.use(express.static(staticPath));

	const reactAppRouting = (_req: express.Request, res: express.Response) => {
		const appProps: any = {
		};
		const body = renderToString(React.createElement<any>(
			App,
			appProps
		));
		res.send(
			html({
				body
			})
		);
	};

	app.get('/app', reactAppRouting);
};
