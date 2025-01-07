import { useSelector } from "react-redux";

export const useProductInfo = () => {
	const { cart, product, isAuth, currentSize, currentColor, wishList } = useSelector(state => ({
		cart: state.cart.data,
		product: state.product.data,
		isAuth: state.auth.data,
		currentColor: state.product.currentColor,
		currentSize: state.product.currentSize,
		wishList: state.wishlist.data,
	}));

	const itemInCart = cart?.find(item => item.product._id === product._id);

	const itemInWishlist = wishList?.find(item => item._id === product._id);

	return { itemInCart, isAuth, currentSize, currentColor, itemInWishlist };
};
