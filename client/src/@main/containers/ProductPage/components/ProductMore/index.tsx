import { Box, Typography } from "@mui/material";
import React from "react";
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
          <Typography variant="title">More for you</Typography>
        </Box>
        <StyledBox>
          {products &&
            products.map(
              ({ name, currentPrice, imageUrls, _id, itemNo }, index) =>
                index < 4 && (
                  <ProductMoreCard
                    key={_id}
                    url={imageUrls[0]}
                    title={name}
                    price={currentPrice}
                    id={_id}
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
