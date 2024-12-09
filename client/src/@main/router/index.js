import { Route, Routes } from "react-router-dom";

import ContactLandingPage from "../containers/ContactLandingPage";
import HistoryBrandLandingPage from "../containers/HistoryBrandLandingPage";
import HomeLandingPage from "../containers/HomeLandingPage";
import LandingPageLogin from "../containers/LandingPageLogin/LandingPageLogin";
import PaymentLandingPage from "../containers/PaymentLandingPage";
import PolicyLandingPage from "../containers/PolicyLandingPage";
import ProductList from "../containers/ProductList";
import ProductPage from "../containers/ProductPage";
import QuestionsLandingPage from "../containers/QuestionsLandingPage";
import RegisterForm from "../containers/RegisterForm/RegisterForm";
import SearchResultPage from "../containers/SearchResultPage";
import ShoppingCart from "../containers/ShoppingCart";
import EmptyCart from "../containers/ShoppingCart/EmptyCart/EmptyCart";
import PaymentPage from "../containers/ShoppingCart/PaymentPage/PaymentPage";
import WorkUsLandingPage from "../containers/WorkUsLandingPage";

function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<HomeLandingPage />} />
			<Route path="/store/:category" element={<ProductList />} />
			<Route path="/product/:id" element={<ProductPage />} />
			<Route path="/shopping-cart" element={<ShoppingCart />} />
			<Route path="/payment" element={<PaymentPage />} />
			<Route path="/login-form" element={<RegisterForm />} />
			<Route path="/login" element={<LandingPageLogin />} />
			<Route path="/empty-cart" element={<EmptyCart />} />
			<Route path="/contact" element={<ContactLandingPage />} />
			<Route path="/history-brand" element={<HistoryBrandLandingPage />} />
			<Route path="/payment" element={<PaymentLandingPage />} />
			<Route path="/policy" element={<PolicyLandingPage />} />
			<Route path="/questions" element={<QuestionsLandingPage />} />
			<Route path="/work-us" element={<WorkUsLandingPage />} />
			<Route path="/search/:searchId" element={<SearchResultPage />} />
		</Routes>
	);
}

export default MainRoutes;
