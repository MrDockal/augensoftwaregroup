import * as React from 'react';
import App from '../../Web/App';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { html } from '../html';
import * as cors from 'cors';
import { IRepository } from '../repository/IRepository';
import { customerRoutes } from './customer/customerRoutes';
import { ServerStyleSheet } from 'styled-components';

export const createApplicationRouter = (
	app: express.Application,
	staticPath: string,
	repository: IRepository,
) => {
	app.use(cors());
	app.use(express.static(staticPath));

	const apiRoute = '/api/v1';
	const reactAppRouting = (_req: express.Request, res: express.Response) => {
		const sheet = new ServerStyleSheet();
		const body = renderToString(sheet.collectStyles(<App config={{baseURL: apiRoute}} />));
		const styles = sheet.getStyleTags();
		res.send(
			html({
				body,
				styles,
			})
		);
	};


	app.get('/', reactAppRouting);

	const publicRouter = express.Router();
	publicRouter.use('/customer', customerRoutes(repository.customer));

	app.use('/api/v1', publicRouter);
};
