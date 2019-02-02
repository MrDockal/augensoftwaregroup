import * as React from 'react';
import MainPage from './Containers/MainPage';
import { ThemeProvider } from 'styled-components';
import { theme } from './Model/theme';
import { ApiProvider } from './Context/ApiContext';

export interface IAppProps {
	config: {
		baseURL: string;
	}
}

const App = (props: IAppProps) => {
	return (
		<ThemeProvider theme={theme}>
			<ApiProvider baseUrl={props.config.baseURL}>
				<MainPage/>
			</ApiProvider>
		</ThemeProvider>
	);
};

export default App;
