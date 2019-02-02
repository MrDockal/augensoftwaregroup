import { ICustomer } from "../../Model/ICustomer";

export interface FindAllFilter {
	offset?: number;
	limit?: number;
}

export interface ICustomerRepository {
	findAll(filter?: FindAllFilter): Promise<ICustomer[]>;
	findByEmail(email: string): Promise<ICustomer | null>;
}

export interface IRepository {
	customer: ICustomerRepository;
}
