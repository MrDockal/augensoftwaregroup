import * as React from 'react';
import { StyledTable } from '../Components/Styled/StyledTable';
import { StyledTableRow } from '../Components/Styled/StyledTableRow';
import { StyledTableColumn } from '../Components/Styled/StyledTableColumn';
import { StyledApplicationPage } from '../Components/Styled/StyledApplicationPage';
import { StyledTableHead } from '../Components/Styled/StyledTableHead';
import { StyledH1 } from '../Components/Styled/StyledH1';

export class MainPage extends React.Component {
	public render() {
		return (
			<StyledApplicationPage>
				<StyledH1>Customer Management</StyledH1>
				<div>
					<StyledTable>
						<thead>
							<StyledTableRow>
								<StyledTableHead>Name</StyledTableHead>
								<StyledTableHead>Surname</StyledTableHead>
								<StyledTableHead>Phone</StyledTableHead>
							</StyledTableRow>
						</thead>
						<tbody>
							<StyledTableRow>
								<StyledTableColumn>first</StyledTableColumn>
								<StyledTableColumn>second</StyledTableColumn>
								<StyledTableColumn>third</StyledTableColumn>
							</StyledTableRow>
							<StyledTableRow>
								<StyledTableColumn>first</StyledTableColumn>
								<StyledTableColumn>second</StyledTableColumn>
								<StyledTableColumn>third</StyledTableColumn>
							</StyledTableRow>
						</tbody>
					</StyledTable>
				</div>
			</StyledApplicationPage>
		);
	}
}
