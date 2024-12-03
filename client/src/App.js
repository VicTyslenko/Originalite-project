import { ThemeProvider } from '@mui/material/styles';

import AppRoutes from './routes';
import theme from './theme';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<AppRoutes />
			<Footer />
		</ThemeProvider>
	);
}

export default App;
