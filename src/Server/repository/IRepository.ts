import { ICustomer } from "../../Model/ICustomer";

export interface ICustomerRepository {
	findAll(): Promise<ICustomer[]>;
	findByEmail(email: string): Promise<ICustomer | null>;
	searchFulltext(expression: string): Promise<ICustomer[]>;
}

export interface IRepository {
	customer: ICustomerRepository;
}
