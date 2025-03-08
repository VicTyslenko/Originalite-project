import { Box } from "@mui/material";
import { DefaultTypography } from "shared/components/typography/default-typography";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { useGetMobileSize } from "shared/utils";

import { StyledBox } from "./ProductMore.styles";
import ProductMoreCard from "./ProductMoreCard";

function ProductMore() {
  const { isMobile } = useGetMobileSize("sm");
  const products = useStoreSelector(state => state.productList.products);

  return (
    !isMobile && (
      <>
        <Box mb={2}>
          <DefaultTypography>More for you</DefaultTypography>
        </Box>
        <StyledBox>
          {products &&
            products.map(
              ({ name, currentPrice, imageUrls, _id, itemNo }, index) =>
                index < 4 && (
                  <ProductMoreCard
                    key={_id}
                    url={imageUrls[0]}
                    name={name}
                    currentPrice={currentPrice}
                    _id={_id}
                    itemNo={itemNo}
                  />
                ),
            )}
        </StyledBox>
      </>
    )
  );
}

export default ProductMore;
