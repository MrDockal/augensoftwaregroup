import * as React from 'react';
import { StyledInputWrapper } from '../../Components/Styled/StyledInputWrapper';
import { Loader } from '../Loader/Loader';

interface IProps {
	onValueChange(searchValue: string): void;
	isLoading: boolean;
}

interface IState {
	searchValue: string;
}

export class SearchCustomer extends React.PureComponent<IProps, IState> {
	public state: IState = {
		searchValue: '',
	};

	public render() {
		return (
			<StyledInputWrapper>
				<input
					type='text'
					placeholder='Search ...'
					value={this.state.searchValue}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onInputChange(e.target.value)}
				/>
				{
					this.props.isLoading &&
					<Loader/>
				}
			</StyledInputWrapper>
		);
	}

	private onInputChange(searchValue: string) {
		this.setState({
			searchValue
		});
		this.props.onValueChange(searchValue);
	}
}
