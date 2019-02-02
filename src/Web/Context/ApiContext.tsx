import * as React from 'react';
import { ICustomer } from '../../Model/ICustomer';
import axios from 'axios';
import { IPagination } from '../../Model/IPagination';

export interface ApiContextValueCustomer {
	customers: ICustomer[];
	isLoading: boolean;
	load(): Promise<void>;
	search(expression: string): Promise<void>;
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
}

interface IState {
	customer: ICustomerState;
}

export class ApiProvider extends React.PureComponent<IProps, IState> {
	public state: IState = {
		customer: {
			customers: [],
			isLoading: false,
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
				}
			}}>
				{this.props.children}
			</ApiContext.Provider>
		)
	}

	private loadCustomers = async () => {
		this.setState({
			customer: {
				...this.state.customer,
				isLoading: true,
			}
		});
		const response = await axios.get<IPagination<ICustomer>>('/customer', {
			baseURL: this.props.baseUrl,
		});
		this.setState({
			customer: {
				customers: response.data.data,
				isLoading: false,
			}
		});
	}

	private searchCustomers = async(expression: string) => {
		this.setState({
			customer: {
				...this.state.customer,
				isLoading: true,
			}
		});
		const response = await axios.get<IPagination<ICustomer>>(`/customer/search/${expression}`, {
			baseURL: this.props.baseUrl,
		});
		this.setState({
			customer: {
				customers: response.data.data,
				isLoading: false,
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
