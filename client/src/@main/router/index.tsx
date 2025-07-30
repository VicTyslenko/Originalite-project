import { EmptyCart } from "@main/containers/ShoppingCart/EmptyCart/EmptyCart";
import AddressDetails from "@profile/containers/AdressDetails/AddressDetails";
import VerificationPage from "components/Verification/VerificationPage";
import { Route, Routes } from "react-router-dom";
import NoMatch from "routes/NoMatch";

import ContactLandingPage from "../containers/ContactLandingPage";
import HistoryBrandLandingPage from "../containers/HistoryBrandLandingPage";
import HomeLandingPage from "../containers/HomeLandingPage";
import LandingPageLogin from "../containers/LandingPageLogin/LandingPageLogin";
import PolicyLandingPage from "../containers/PolicyLandingPage";
import ProductList from "../containers/ProductList/ProductList";
import ProductPage from "../containers/ProductPage/ProductPage";
import QuestionsLandingPage from "../containers/QuestionsLandingPage";
import RegisterForm from "../containers/RegisterForm/RegisterForm";
import ShoppingCart from "../containers/ShoppingCart";
import PaymentPage from "../containers/ShoppingCart/PaymentPage/PaymentPage";
import WorkUsLandingPage from "../containers/WorkUsLandingPage";

const MainRoutes = () => {
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
      <Route path="/policy" element={<PolicyLandingPage />} />
      <Route path="/questions" element={<QuestionsLandingPage />} />
      <Route path="/work-us" element={<WorkUsLandingPage />} />
      <Route path="/address-details" element={<AddressDetails />} />
      <Route path="/verify" element={<VerificationPage />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default MainRoutes;
