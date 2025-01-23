import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainRoutes from "./router";
import { actionFetchUserData } from "./store/actions/authActions";
import { getCart } from "./store/actions/cartActions";
import { getWishlist } from "./store/actions/wishlistActions";

function Main() {
	const dispatch = useDispatch();

	const userData = useSelector(state => state.auth.data);

	useEffect(() => {
		if (userData) {
			dispatch(getCart());
		}
	}, [userData]);

	useEffect(() => {
		if (userData) {
			dispatch(getWishlist());
		}
	}, [userData, dispatch]);

	return <MainRoutes />;
}

export default Main;
