import { ThemeProvider } from "@mui/material/styles";

import { AppContainer } from "globalStyles";
import { Toaster } from "react-hot-toast";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./routes";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        <AppRoutes />
        <Footer />
        <Toaster position="top-center" reverseOrder={true} />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
