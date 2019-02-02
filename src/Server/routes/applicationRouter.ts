import * as React from 'react';
import App from '../../Web/App';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { html } from '../html';
import * as cors from 'cors';
import { IRepository } from '../repository/IRepository';
import { customerRoutes } from './customer/customerRoutes';

export const createApplicationRouter = (
	app: express.Application,
	staticPath: string,
	repository: IRepository,
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


	app.get('/', reactAppRouting);

	const publicRouter = express.Router();
	publicRouter.use('/customer', customerRoutes(repository.customer));

	app.use('/api/v1', publicRouter);
};
