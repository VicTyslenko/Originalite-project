import { ThemeProvider } from "@mui/material/styles";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./routes";
import theme from "./theme";

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
