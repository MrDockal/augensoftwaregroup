import * as React from 'react';
import { StyledApplicationPage } from '../Components/Styled/StyledApplicationPage';
import { StyledH1 } from '../Components/Styled/StyledH1';
import { SearchCustomer } from '../Components/Customers/SearchCustomer';
import { withApi, IApiProps } from '../Context/ApiContext';
import { CustomerTable } from '../Components/Customers/CustomerTable';
import { Pagination } from '../Components/Pagination/Pagination';
import * as _ from 'lodash';

interface IOwnProps {}

class MainPage extends React.PureComponent<IOwnProps & IApiProps> {

	private searchValue: string;

	private searchCustomersDebounced = _.debounce(
		(searchValue: string) => {
			this.props.api.customer.search(searchValue, 1);
		},
		250
	);

	private loadCustomersDebounced = _.debounce(
		(pageNumber: number) => {
			this.props.api.customer.load(pageNumber);
		},
		250
	)

	public componentDidMount() {
		this.loadCustomersDebounced(this.props.api.customer.page);
	}

	public render() {
		return (
			<StyledApplicationPage>
				<StyledH1>Customer Management</StyledH1>
				<SearchCustomer isLoading={this.props.api.customer.isLoading} onValueChange={this.onInputChange}></SearchCustomer>
				<Pagination
					activePage={this.props.api.customer.page}
					totalPages={this.props.api.customer.pageCount}
					goToPage={this.goToPage}
				>
				</Pagination>
				<CustomerTable customers={this.props.api.customer.customers}/>
			</StyledApplicationPage>
		);
	}

	private goToPage = (pageNumber: number) => {
		if (this.searchValue) {
			this.props.api.customer.search(this.searchValue, pageNumber)
		} else {
			this.props.api.customer.load(pageNumber);
		}
	}

	private onInputChange = (searchValue: string) => {
		this.searchValue = searchValue;
		if (searchValue.length === 0) {
			this.loadCustomersDebounced(this.props.api.customer.page);
		} else {
			this.searchCustomersDebounced(searchValue);
		}
	}
}

export default withApi(MainPage);