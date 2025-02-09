import { useSelector } from "react-redux";

export const useProductInfo = () => {
	const cart = useSelector(state => state.cart.data);

	const product = useSelector(state => state.product.data);

	const user = useSelector(state => state.auth.data || state.tempAuth.tempData);

	const currentColor = useSelector(state => state.product.currentColor);

	const currentSize = useSelector(state => state.product.currentSize);

	const wishList = useSelector(state => state.wishlist.data);

	const itemInCart = cart?.find(item => item.product._id === product?._id);

	const itemInWishlist = wishList?.find(item => item._id === product?._id);

	return { itemInCart, user, currentSize, currentColor, itemInWishlist, wishList };
};
