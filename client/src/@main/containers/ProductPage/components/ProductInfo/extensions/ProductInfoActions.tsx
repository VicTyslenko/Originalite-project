import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Tooltip } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useCallback, useState } from "react";

import { addProductToCart, deleteProductFromCart } from "../../../../../store/actions/cart/cartActions";
import { addProductToWishlist, deleteProductFromWishlist } from "../../../../../store/actions/wishlistActions";
import { ActionsWrapper, StyledButton } from "../StyledProductInfo";
import { useProductInfo } from "../hooks/useProductInfo";

function ProductInfoActions({ id }: { id: string }) {
  const [openTooltip, setOpenTooltip] = useState(false);

  const dispatch = useStoreDispatch();

  const { itemInCart, user, currentSize, currentColor, itemInWishlist } = useProductInfo();

  const handleClickCart = useCallback(() => {
    if (itemInCart) {
      dispatch(deleteProductFromCart(id));
    } else {
      dispatch(addProductToCart(id));
    }
  }, [id, itemInCart, dispatch]);

  const handleClickWishlist = useCallback(() => {
    if (itemInWishlist) {
      dispatch(deleteProductFromWishlist(id));
    } else {
      dispatch(addProductToWishlist(id));
    }
  }, [id, itemInWishlist, dispatch]);

  const handleOpenTooltip = () => {
    if ((!currentSize || !currentColor) && !itemInCart) {
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
            disabled={(!currentSize || !currentColor) && !itemInCart}
          >
            {itemInCart ? "Delete" : "Add to cart"}
          </StyledButton>
        </span>
      </Tooltip>
      {user && (
        <IconButton onClick={handleClickWishlist} sx={{ color: itemInWishlist ? "#E01515" : "#fff" }}>
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </ActionsWrapper>
  );
}

export default ProductInfoActions;
