import * as React from 'react';
import { ICustomer } from '../../Model/ICustomer';
import axios from 'axios';
import { IPagination } from '../../Model/IPagination';

export interface ApiContextValueCustomer {
	customers: ICustomer[];
	isLoading: boolean;
	load(pageNumber: number): Promise<void>;
	search(expression: string, pageNumber: number): Promise<void>;
	page: number;
	pageCount: number;
}

export interface ApiContextValue {
	customer: ApiContextValueCustomer;
}

const ApiContext = React.createContext<ApiContextValue>({
	customers: [],
} as any);

interface IProps {
	baseUrl: string;
}

interface ICustomerState {
	customers: ICustomer[];
	isLoading: boolean;
	page: number;
	pageCount: number;
}

interface IState {
	customer: ICustomerState;
}

export class ApiProvider extends React.PureComponent<IProps, IState> {
	public state: IState = {
		customer: {
			customers: [],
			isLoading: false,
			page: 1,
			pageCount: 0,
		}
	};

	public render() {
		return (
			<ApiContext.Provider value={{
				customer: {
					customers: this.state.customer.customers,
					isLoading: this.state.customer.isLoading,
					load: this.loadCustomers,
					search: this.searchCustomers,
					page: this.state.customer.page,
					pageCount: this.state.customer.pageCount,
				}
			}}>
				{this.props.children}
			</ApiContext.Provider>
		)
	}

	private loadCustomers = async (page?: number) => {
		const pageNumber = (page) ? page : 1;
		this.setState({
			customer: {
				...this.state.customer,
				isLoading: true,
				page: pageNumber,
			}
		});
		const pageParameters = (pageNumber) ? `?page=${pageNumber}` : '';
		const response = await axios.get<IPagination<ICustomer>>(`/customer${pageParameters}`, {
			baseURL: this.props.baseUrl,
		});
		this.setState({
			customer: {
				...this.state.customer,
				customers: response.data.data,
				isLoading: false,
				page: parseInt(response.data.page.toString()),
				pageCount: parseInt(response.data.pageCount.toString()),
			}
		});
	}

	private searchCustomers = async(expression: string, page?: number) => {
		const pageNumber = (page) ? page : 1;
		this.setState({
			customer: {
				...this.state.customer,
				isLoading: true,
				page: pageNumber,
			}
		});
		const pageParameters = (pageNumber) ? `?page=${pageNumber}` : '';
		const response = await axios.get<IPagination<ICustomer>>(`/customer/search/${expression}${pageParameters}`, {
			baseURL: this.props.baseUrl,
		});
		this.setState({
			customer: {
				...this.state.customer,
				customers: response.data.data,
				isLoading: false,
				page: parseInt(response.data.page.toString()),
				pageCount: parseInt(response.data.pageCount.toString()),
			}
		});
	}
}

export interface IApiProps {
	api: ApiContextValue;
}

export const withApi = <OwnProps extends {}>(WrappedComponent: React.ComponentType<OwnProps & IApiProps>) => (
	(props: OwnProps) => (
		<ApiContext.Consumer>
			{(value: ApiContextValue) => <WrappedComponent {...props} api={value} />}
		</ApiContext.Consumer>
	)
);
