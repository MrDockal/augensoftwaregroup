import { IRepository } from "../IRepository";
import * as csvtojson from 'csvtojson';
import { ICustomer } from '../../../Model/ICustomer';

export const loadCsvFile = async <T extends any>(filePath: string) => {
	return await csvtojson().fromFile(filePath) as T[];
}

export const searchFulltext = async (allCustomers: ICustomer[], fulltext: string) => {
	const allowedValues = ['first_name', 'last_name', 'phone1', 'email'];
	return allCustomers.filter((customer: ICustomer) => {
		const values = Object.keys(customer)
			.filter((key: string) => allowedValues.indexOf(key) >= 0)
			.map((key: string) => (customer as any)[key]) //cannot be properly typed
		;
		return values.find((value: string) => value.indexOf(fulltext) > -1);
	});
}

export const createFilesystemRepository = async (customerFilePath: string): Promise<IRepository> => {
	const allCustomers = await loadCsvFile<ICustomer>(customerFilePath);
	const findByEmail = async () => null;
	return {
		customer: {
			findAll: async () => {
				return allCustomers;
			},
			findByEmail,
			searchFulltext: async(fulltext: string) => {
				return searchFulltext(allCustomers, fulltext);
			}
		},
	}
};
