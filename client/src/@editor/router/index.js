import { Routes, Route } from 'react-router-dom';

import EditProducts from '../components/EditProducts';
import EditShop from '../components/EditShop';
import EditUsers from '../components/EditUsers';
import EditStyleShop from '../components/EditStyleShop';
import EditOrders from '../components/EditOrders';
import Dashboard from '../components/Dashboard';


function EditorRoutes() {
	return (
		<>
			<Routes>
				<Route path ='/dashboard' element={<Dashboard />} />
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
