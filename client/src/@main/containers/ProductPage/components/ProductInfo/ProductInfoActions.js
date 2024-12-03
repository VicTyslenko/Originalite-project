import React, { useCallback, useState } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, deleteProductFromCart } from '../../../../store/actions/cartActions';
import { addProductToWishlist, deleteProductFromWishlist } from '../../../../store/actions/wishlistActions';
import { selectCurrentColor, selectCurrentSize } from '../../../../store/selectors/productSelector';
import { isAuthSelector } from '../../../../store/selectors/authSelector';
import { selectIsCart } from '../../../../store/selectors/cartSelector';
import { selectIsWishlist } from '../../../../store/selectors/wishSelector';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ActionsWrapper, StyledButton } from './ProductInfo.styles';

function ProductInfoActions({ id }) {
	const dispatch = useDispatch();
	const isCart = useSelector((state) => selectIsCart(state, id));
	const isWishlist = useSelector((state) => selectIsWishlist(state, id));
	const isAuth = useSelector(isAuthSelector);

	const currentSize = useSelector(selectCurrentSize);
	const currentColor = useSelector(selectCurrentColor);
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
						{isCart ? 'Delete' : 'Add to cart'}
					</StyledButton>
				</span>
			</Tooltip>
			{isAuth && (
				<IconButton onClick={handleClickWishlist} sx={{ color: isWishlist ? '#E01515' : '#fff' }}>
					<FavoriteBorderIcon />
				</IconButton>
			)}
		</ActionsWrapper>
	);
}

export default ProductInfoActions;
