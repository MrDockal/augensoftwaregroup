import * as express from 'express';
import { ICustomerRepository } from '../../repository/IRepository';

export const customerRoutes = (
	customerRepository: ICustomerRepository,
) => {
	const router = express.Router();
	router.get('/', async(req: express.Request, res: express.Response) => {
		const limit = req.query.limit;
		const offset = req.query.offset;
		const foundCustomers = await customerRepository.findAll({
			limit,
			offset
		});
		res.send(foundCustomers);
	});
	router.get('/search/:expression', async(req: express.Request, res: express.Response) => {
		const expression = req.params.expression;
		const foundCustomers = await customerRepository.searchFulltext(expression);
		res.send(foundCustomers);
	});
	return router;
}
