import { IRepository, FindAllFilter } from "../IRepository";
import * as csvtojson from 'csvtojson';
import { ICustomer } from '../../../Model/ICustomer';

export const loadCsvFile = async <T extends any>(filePath: string) => {
	return await csvtojson().fromFile(filePath) as T[];
}

export const findAllCustomers = async (allCustomers: ICustomer[], filter?: FindAllFilter) => {
	const offset = (filter && filter.offset) ? filter.offset : 0;
	const limit = (filter && filter.limit) ? filter.limit : allCustomers.length;
	return allCustomers.slice(offset, limit);
}

export const searchFulltext = async (allCustomers: ICustomer[], fulltext: string) => {
	return allCustomers.filter((customer: ICustomer) => {
		const values = Object.keys(customer).map((key: string) => (customer as any)[key]); //cannot be properly typed
		return values.find((value: string) => value.indexOf(fulltext) > -1);
	});
}

export const createFilesystemRepository = async (customerFilePath: string): Promise<IRepository> => {
	const allCustomers = await loadCsvFile<ICustomer>(customerFilePath);
	const findByEmail = async () => null;
	return {
		customer: {
			findAll: async (filter?: FindAllFilter) => {
				return findAllCustomers(allCustomers, filter);
			},
			findByEmail,
			searchFulltext: async(fulltext: string) => {
				return searchFulltext(allCustomers, fulltext);
			}
		},
	}
};
