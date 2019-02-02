import { IRepository } from "../IRepository";
import * as csvtojson from 'csvtojson';
import { ICustomer } from '../../../Model/ICustomer';

export const loadCsvFile = async <T extends any>(filePath: string) => {
	return await csvtojson().fromFile(filePath) as T[];
}

export const createFilesystemRepository = async (customerFilePath: string): Promise<IRepository> => {
	const allCustomers = await loadCsvFile<ICustomer>(customerFilePath);
	const findAll = async () => allCustomers;
	const findByEmail = async () => null;
	return {
		customer: {
			findAll,
			findByEmail,
		},
	}
};
