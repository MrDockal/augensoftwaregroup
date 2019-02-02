import * as express from 'express';
import { ICustomerRepository } from '../../repository/IRepository';
import { paginationFilter } from '../../paginationFilter/paginationFilter';

export const customerRoutes = (
	customerRepository: ICustomerRepository,
) => {
	const router = express.Router();
	router.get('/', async(req: express.Request, res: express.Response) => {
		const page = req.query.page || 1;
		const foundCustomers = await customerRepository.findAll();
		const paginated = paginationFilter(foundCustomers, page);
		res.send(paginated);
	});
	router.get('/search/:expression', async(req: express.Request, res: express.Response) => {
		const page = req.query.page || 1;
		const expression = req.params.expression;
		const foundCustomers = await customerRepository.searchFulltext(expression);
		const paginated = paginationFilter(foundCustomers, page);
		res.send(paginated);
	});
	return router;
}
