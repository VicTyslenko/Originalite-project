import { Box, Pagination, Stack } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultTypography } from "shared/components/typography/default-typography";

import { getProductList } from "../../store/actions/productListActions";
import { StyledBox, StyledContainer } from "./StyledProductList";
import EmptyProductPage from "./components/EmptyProductPage/EmptyProductPage";
import ProductCard from "./components/ProductCard/ProductCard";
import ProductFilters from "./components/ProductFilters";
import { useGetParams } from "./hooks";

const perPage = 6;

function ProductList() {
  const dispatch = useStoreDispatch();

  const [startPage, setPage] = useState(1);

  const { category } = useParams();

  const { minPrice, maxPrice, products, colors, categories, count } = useGetParams();

  useEffect(() => {
    dispatch(
      getProductList({
        startPage,
        perPage,
        male: category,
        categories,
        colors,
      }),
    );
    window.scrollTo(0, 0);
  }, [startPage, minPrice, maxPrice, colors, category, categories]);

  return (
    <>
      <StyledContainer maxWidth="lg">
        <ProductFilters />
        {products.length !== 0 && (
          <Box sx={{ pb: "30px" }}>
            <DefaultTypography as="h3">{categories}</DefaultTypography>
            <StyledBox>
              {products &&
                products.map(({ name, currentPrice, imageUrls, _id, itemNo }) => (
                  <ProductCard
                    key={_id}
                    name={name}
                    currentPrice={currentPrice}
                    url={imageUrls[0]}
                    alt={name}
                    _id={itemNo}
                  />
                ))}
            </StyledBox>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(count / perPage)}
                page={startPage}
                onChange={(_, page) => {
                  setPage(page);
                }}
              />
            </Stack>
          </Box>
        )}
        {products.length === 0 && <EmptyProductPage />}
      </StyledContainer>
    </>
  );
}

export default ProductList;
