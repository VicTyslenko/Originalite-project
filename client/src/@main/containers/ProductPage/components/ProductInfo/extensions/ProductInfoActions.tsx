import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Tooltip } from "@mui/material";

import { ActionsWrapper, StyledButton } from "../StyledProductInfo";
import { useProductInfo } from "../hooks/useProductInfo";

function ProductInfoActions({ id }: { id: string }) {
  const {
    itemInCart,
    user,
    currentSize,
    currentColor,
    itemInWishlist,
    openTooltip,
    handleClickCart,
    handleClickWishlist,
    handleCloseTooltip,
    handleOpenTooltip,
  } = useProductInfo({ id });


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
