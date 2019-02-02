import * as React from 'react';
import { ICustomer } from '../../Model/ICustomer';
import axios from 'axios';

export interface ApiContextValue {
	customers: ICustomer[];
	loadingCustomers: boolean;
	loadCustomers(): Promise<void>;
	searchCustomers(expression: string): Promise<void>;
}

const ApiContext = React.createContext<ApiContextValue>({
	customers: [],
} as any);

interface IProps {
	baseUrl: string;
}

interface IState {
	customers: ICustomer[];
	loadingCustomers: boolean;
}

export class ApiProvider extends React.PureComponent<IProps, IState> {
	public state: IState = {
		customers: [],
		loadingCustomers: false,
	};

	public render() {
		return (
			<ApiContext.Provider value={{
				customers: this.state.customers,
				loadingCustomers: this.state.loadingCustomers,
				loadCustomers: this.loadCustomers,
				searchCustomers: this.searchCustomers,
			}}>
				{this.props.children}
			</ApiContext.Provider>
		)
	}

	private loadCustomers = async () => {
		this.setState({
			loadingCustomers: true,
		});
		const response = await axios.get<ICustomer[]>('/customer', {
			baseURL: this.props.baseUrl,
		});
		this.setState({
			loadingCustomers: false,
			customers: response.data
		});
	}

	private searchCustomers = async(expression: string) => {
		this.setState({
			loadingCustomers: true,
		});
		const response = await axios.get<ICustomer[]>(`/customer/search/${expression}`, {
			baseURL: this.props.baseUrl,
		});
		this.setState({
			loadingCustomers: false,
			customers: response.data
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
