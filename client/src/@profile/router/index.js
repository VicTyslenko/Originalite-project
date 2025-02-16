import { Route, Routes } from "react-router-dom";

import MyAccount from "../MyAccount/MyAccount";
import AddressBook from "../containers/AddressBook/";
import AddressDetails from "../containers/AdressDetails/AddressDetails";
import MyProfile from "../containers/MyProfile/";
import Profile from "../containers/Profile/";
import PurchaseHistory from "../containers/PurchaseHistory/";
import Wishlist from "../containers/Wishlist/";

function ProfileRoutes() {
	return (
		<Routes>
			<Route path="my-account" element={<MyAccount />} />
			<Route path="profile" element={<Profile />} />
			<Route path="my-profile" element={<MyProfile />} />
			<Route path="my-wishlist" element={<Wishlist />} />
			<Route path="address-book" element={<AddressBook />} />
			<Route path="purchase-history" element={<PurchaseHistory />} />
		</Routes>
	);
}

export default ProfileRoutes;
