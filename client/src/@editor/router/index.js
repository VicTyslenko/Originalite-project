import { Route, Routes } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import EditOrders from "../components/EditOrders";
import EditProducts from "../components/EditProducts";
import EditShop from "../components/EditShop";
import EditStyleShop from "../components/EditStyleShop";
import EditUsers from "../components/EditUsers";

function EditorRoutes() {
	return (
		<>
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/products" element={<EditProducts />} />
				<Route path="/shop" element={<EditShop />} />
				<Route path="/users" element={<EditUsers />} />
				<Route path="/style-shop" element={<EditStyleShop />} />
				<Route path="/orders" element={<EditOrders />} />
			</Routes>
		</>
	);
}

export default EditorRoutes;
