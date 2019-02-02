import * as React from 'react';
import { StyledApplicationPage } from '../Components/Styled/StyledApplicationPage';
import { StyledH1 } from '../Components/Styled/StyledH1';
import { withApi, IApiProps } from '../Context/ApiContext';
import { CustomerTable } from '../Components/Customers/CustomerTable';

interface IOwnProps {}

class MainPage extends React.Component<IOwnProps & IApiProps> {

	public componentDidMount() {
		this.props.api.loadCustomers();
	}

	public render() {
		return (
			<StyledApplicationPage>
				<StyledH1>Customer Management</StyledH1>
				<CustomerTable customers={this.props.api.customers}/>
			</StyledApplicationPage>
		);
	}
}

export default withApi(MainPage);