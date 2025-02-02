import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import MainRoutes from "./router";
import { getCart } from "./store/actions/cartActions";
import { getWishlist } from "./store/actions/wishlistActions";

function Main() {
	const dispatch = useDispatch();

	const user = useUserData();

	useEffect(() => {
		dispatch(getCart());
	}, []);

	useEffect(() => {
		if (user) {
			dispatch(getWishlist());
		}
	}, [user]);

	return <MainRoutes />;
}

export default Main;
