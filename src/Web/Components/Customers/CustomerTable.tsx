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
							<StyledTableHead>First Name</StyledTableHead>
							<StyledTableHead>Last Name</StyledTableHead>
							<StyledTableHead>Phone</StyledTableHead>
							<StyledTableHead>Email</StyledTableHead>
						</StyledTableRow>
					</thead>
					<tbody>
						{
							this.props.customers.map((customer: ICustomer) => (
								<StyledTableRow key={customer.email}>
									<StyledTableColumn>{customer.first_name}</StyledTableColumn>
									<StyledTableColumn>{customer.last_name}</StyledTableColumn>
									<StyledTableColumn>{customer.phone1}</StyledTableColumn>
									<StyledTableColumn>{customer.email}</StyledTableColumn>
								</StyledTableRow>
							))
						}
					</tbody>
				</StyledTable>
			</div>
		);
	} 
}
