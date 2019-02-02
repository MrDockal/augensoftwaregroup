import * as React from 'react';
import { StyledTable } from '../../Components/Styled/StyledTable';
import { StyledTableRow } from '../../Components/Styled/StyledTableRow';
import { StyledTableColumn } from '../../Components/Styled/StyledTableColumn';
import { StyledTableHead } from '../../Components/Styled/StyledTableHead';
import { ICustomer } from '../../../Model/ICustomer';

interface IProps {
	customers: ICustomer[];
}
export class CustomerTable extends React.PureComponent<IProps> {
	public render(){
		return (
			<div>
				<StyledTable>
					<thead>
						<StyledTableRow>
							<StyledTableHead>Name</StyledTableHead>
							<StyledTableHead>Surname</StyledTableHead>
							<StyledTableHead>Address</StyledTableHead>
							<StyledTableHead>City</StyledTableHead>
							<StyledTableHead>State</StyledTableHead>
							<StyledTableHead>Post</StyledTableHead>
							<StyledTableHead>Phone&nbsp;1</StyledTableHead>
							<StyledTableHead>Phone&nbsp;2</StyledTableHead>
							<StyledTableHead>Email</StyledTableHead>
							<StyledTableHead>Website</StyledTableHead>
						</StyledTableRow>
					</thead>
					<tbody>
						{
							this.props.customers.map((customer: ICustomer) => (
								<StyledTableRow key={customer.email}>
									<StyledTableColumn>{customer.first_name}</StyledTableColumn>
									<StyledTableColumn>{customer.last_name}</StyledTableColumn>
									<StyledTableColumn>{customer.address}</StyledTableColumn>
									<StyledTableColumn>{customer.city}</StyledTableColumn>
									<StyledTableColumn>{customer.state}</StyledTableColumn>
									<StyledTableColumn>{customer.post}</StyledTableColumn>
									<StyledTableColumn>{customer.phone1}</StyledTableColumn>
									<StyledTableColumn>{customer.phone2}</StyledTableColumn>
									<StyledTableColumn>{customer.email}</StyledTableColumn>
									<StyledTableColumn>{customer.web}</StyledTableColumn>
								</StyledTableRow>
							))
						}
					</tbody>
				</StyledTable>
			</div>
		);
	} 
}
