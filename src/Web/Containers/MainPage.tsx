import * as React from 'react';
import { StyledApplicationPage } from '../Components/Styled/StyledApplicationPage';
import { StyledH1 } from '../Components/Styled/StyledH1';
import { SearchCustomer } from '../Components/Customers/SearchCustomer';
import { withApi, IApiProps } from '../Context/ApiContext';
import { CustomerTable } from '../Components/Customers/CustomerTable';
import * as _ from 'lodash';

interface IOwnProps {}

class MainPage extends React.PureComponent<IOwnProps & IApiProps> {

	private searchCustomersDebounced = _.debounce(
		(searchValue: string) => {
			this.props.api.customer.search(searchValue);
		},
		1500
	);

	private loadCustomersDebounced = _.debounce(
		() => {
			this.props.api.customer.load();
		},
		1500
	)

	public componentDidMount() {
		this.loadCustomersDebounced();
	}

	public render() {
		return (
			<StyledApplicationPage>
				<StyledH1>Customer Management</StyledH1>
				<SearchCustomer isLoading={this.props.api.customer.isLoading} onValueChange={this.onInputChange}></SearchCustomer>
				<CustomerTable customers={this.props.api.customer.customers}/>
			</StyledApplicationPage>
		);
	}

	private onInputChange = (searchValue: string) => {
		if (searchValue.length === 0) {
			this.loadCustomersDebounced();
		} else {
			this.searchCustomersDebounced(searchValue);
		}
	}
}

export default withApi(MainPage);