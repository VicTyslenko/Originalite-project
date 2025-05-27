import { setSize } from "@main/store/slices/product/productSlice";
import { ListItemText, Popover, Typography } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useState } from "react";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { ListItemButtonStyled, ListStyled, SizeList } from "./StyledProductInfo";
import img from "./sizeguide.jpg";

type Props = {
  sizes: string[];
};
function ProductInfoSizes({ sizes }: Props) {
  const currentSize = useStoreSelector(state => state.product.currentSize);
  const dispatch = useStoreDispatch();

  const handleListSizeClick = (value: string) => {
    dispatch(setSize(value));
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const anchor = open ? "simple-popover" : undefined;

  return (
    <SizeList>
      <Typography variant="subtitle2">Size</Typography>
      <ListStyled>
        {sizes.map(item => (
          <ListItemButtonStyled key={item} selected={currentSize === item} onClick={() => handleListSizeClick(item)}>
            <ListItemText primary={item} />
          </ListItemButtonStyled>
        ))}
      </ListStyled>
      <Typography variant="caption" onClick={handleClick} sx={{ cursor: "pointer" }} aria-describedby={anchor}>
        Size guide
      </Typography>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <img src={img} alt="Size guide for T-shirt measurements" />
      </Popover>
    </SizeList>
  );
}

export default ProductInfoSizes;
