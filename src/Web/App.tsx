import * as React from 'react';
import { MainPage } from './Containers/MainPage';
import { ThemeProvider } from 'styled-components';
import { theme } from './Model/theme';

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<MainPage/>
		</ThemeProvider>
	);
};

export default App;
