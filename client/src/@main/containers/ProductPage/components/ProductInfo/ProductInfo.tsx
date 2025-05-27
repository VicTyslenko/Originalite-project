import { Box, Typography } from "@mui/material";

import ProductInfoSizes from "./ProductInfoSizes";
import { ProductHeader, ProductInfoHeader } from "./StyledProductInfo";
import ProductInfoActions from "./extensions/ProductInfoActions";
import ProductInfoColors from "./extensions/ProductInfoColors";
import type { ProductInfoProps } from "./models";

function ProductInfo({
  id,
  name,
  productUrl,
  currentPrice,
  colors,
  sizes,
  productDetails,
  productDelivery,
}: ProductInfoProps) {
  return (
    <Box maxWidth="390px" margin="auto">
      <ProductInfoHeader>
        <ProductHeader>
          <Typography variant="h3" sx={{ width: "80%" }}>
            {name}
          </Typography>

          <Typography variant="h3" sx={{ width: "20%" }}>
            {currentPrice} $
          </Typography>
        </ProductHeader>

        <Typography variant="overline">REF: {productUrl}</Typography>
      </ProductInfoHeader>

      <ProductInfoColors colors={colors} />

      <ProductInfoSizes sizes={sizes} />

      <ProductInfoActions id={id} />

      <Box sx={{ pb: "20px" }}>
        <Typography variant="subtitle2">Details</Typography>
        <Typography variant="body1">{productDetails}</Typography>
        <Typography mt={1} variant="body1">
          {productDelivery}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProductInfo;
