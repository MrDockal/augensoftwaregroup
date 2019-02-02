import * as React from 'react';
import styled from 'styled-components';

interface IProps {
	activePage: number;
	totalPages: number;
	goToPage(page: number): void,
}

const StyledLinkWrapper = styled.div`
	display: inline-block;
	margin-bottom: 20px;
	a {
		border-radius: 5px;
		padding: 8px 16px;
		text-decoration: none;
		color: #1c1e24;
		&.active {
			font-weight: bold;
			background-color: #4E5066;
			color: #fff;
		}
		&:hover:not(.active) {
			background-color: #ddd;
		}
	}
`;

export class Pagination extends React.PureComponent<IProps> {
	public render() {
		let totalPages: number[] = [];
		for (let i =  0; i < this.props.totalPages; i++) {
			totalPages = [
				...totalPages,
				i
			]
		}
		const prevPage = this.props.activePage - 1;
		const nextPage = this.props.activePage + 1;
		return (
			<StyledLinkWrapper>
				<a
					href={''}
					onClick={(e: React.MouseEvent<any>) => {
						e.preventDefault();
						if (prevPage > 0) {
							this.props.goToPage(1);
						}
					}}
				>
					&laquo;
				</a>
				{
					totalPages.map((page: number) => {
						if (
							(this.props.activePage - 3) > page ||
							(this.props.activePage + 9) < page
						) {
							return <React.Fragment/>
						}
						return <a
							href={''}
							className={((page + 1) === this.props.activePage) ? 'active' : ''}
							key={page}
							onClick={(e: React.MouseEvent<any>) => {
								e.preventDefault();
								this.props.goToPage(page + 1)
							}}
						>
							{page + 1}
						</a>
					})
				}
				<a
					href={''}
					onClick={(e: React.MouseEvent<any>) => {
						e.preventDefault();
						if (nextPage <= this.props.totalPages) {
							this.props.goToPage(this.props.totalPages);
						}
					}}
				>
					&raquo;
				</a>
			</StyledLinkWrapper>
		);
	}
}
