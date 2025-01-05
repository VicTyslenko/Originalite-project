import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Tooltip } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductToCart, deleteProductFromCart } from "../../../../store/actions/cartActions";
import { addProductToWishlist, deleteProductFromWishlist } from "../../../../store/actions/wishlistActions";
import { ActionsWrapper, StyledButton } from "./ProductInfo.styles";

function ProductInfoActions({ id }) {
	const dispatch = useDispatch();
	const isCart = useSelector((state, id) => state.cart.data?.find(({ product }) => id === product?._id));

	const isWishlist = useSelector((state, id) => state.wishlist.data?.find(el => id === el._id));
	const isAuth = useSelector(state => state.auth.data);

	const currentSize = useSelector(state => state.product.currentSize);
	const currentColor = useSelector(state => state.product.currentColor);
	const [openTooltip, setOpenTooltip] = useState(false);

	const handleClickCart = useCallback(() => {
		if (isCart) {
			dispatch(deleteProductFromCart(id));
		} else {
			dispatch(addProductToCart(id));
		}
	}, [id, isCart, dispatch]);

	const handleClickWishlist = useCallback(() => {
		if (isWishlist) {
			dispatch(deleteProductFromWishlist(id));
		} else {
			dispatch(addProductToWishlist(id));
		}
	}, [id, isWishlist, dispatch]);

	const handleOpenTooltip = () => {
		if ((!currentSize || !currentColor) && !isCart) {
			setOpenTooltip(true);
		}
	};

	const handleCloseTooltip = () => {
		setOpenTooltip(false);
	};

	return (
		<ActionsWrapper>
			<Tooltip
				title="Choose color and size"
				placement="top"
				disableInteractive
				open={openTooltip}
				onOpen={handleOpenTooltip}
				onClose={handleCloseTooltip}
			>
				<span>
					<StyledButton
						color="primary"
						variant="contained"
						onClick={handleClickCart}
						disabled={(!currentSize || !currentColor) && !isCart}
					>
						{isCart ? "Delete" : "Add to cart"}
					</StyledButton>
				</span>
			</Tooltip>
			{isAuth && (
				<IconButton onClick={handleClickWishlist} sx={{ color: isWishlist ? "#E01515" : "#fff" }}>
					<FavoriteBorderIcon />
				</IconButton>
			)}
		</ActionsWrapper>
	);
}

export default ProductInfoActions;
