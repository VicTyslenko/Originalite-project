import { setColor } from "@main/store/slices/product/productSlice";
import { ListItemText, Typography } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { ColorIcon, ColorList, ListItemButtonStyled, ListItemIconColor, ListStyled } from "../StyledProductInfo";

type Props = {
  colors: {
    color: string;
    hash: string;
  }[];
};
function ProductInfoColors({ colors }: Props) {
  const currentColor = useStoreSelector(state => state.product.currentColor);
  const dispatch = useStoreDispatch();

  const handleListColorClick = (value: string) => {
    dispatch(setColor(value));
  };

  return (
    <ColorList>
      <Typography variant="subtitle2">Color</Typography>
      <ListStyled>
        {colors.map(({ color, hash }) => (
          <ListItemButtonStyled
            key={color}
            selected={currentColor === color}
            onClick={() => handleListColorClick(color)}
          >
            <ListItemIconColor>
              <ColorIcon backgroundColor={hash} />
            </ListItemIconColor>
            <ListItemText primary={color} />
          </ListItemButtonStyled>
        ))}
      </ListStyled>
    </ColorList>
  );
}

export default ProductInfoColors;
