import { Box, Pagination, Stack } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { getProductList } from "../../store/actions/productListActions";
import { StyledBox, StyledContainer, StyledTitle } from "./StyledProductList";
import EmptyProductPage from "./components/EmptyProductPage/EmptyProductPage";
import ProductCard from "./components/ProductCard";
import ProductFilters from "./components/ProductFilters";

const perPage = 6;

function ProductList() {
  const dispatch = useStoreDispatch();

  const [startPage, setPage] = useState(1);
  const { category } = useParams();

  const products = useStoreSelector(state => state.productList.data);
  const count = useStoreSelector(state => state.productList.count);
  const minPrice = useStoreSelector(state => state.filters.minPrice);
  const maxPrice = useStoreSelector(state => state.filters.maxPrice);
  const colors = useStoreSelector(state => state.filters.colors);
  const categories = useStoreSelector(state => state.filters.categories);

  const handlePageChange = (_, page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(
      getProductList({
        startPage,
        perPage,
        minPrice,
        maxPrice,
        colors,
        categories,
        male: category,
      }),
    );
    window.scrollTo(0, 0);
  }, [startPage, dispatch, minPrice, maxPrice, colors, categories, category]);

  return (
    <>
      <StyledContainer maxWidth="lg">
        <ProductFilters />
        {products.length !== 0 && (
          <Box sx={{ pb: "30px" }}>
            <StyledTitle variant="title" component="div" sx={{ textTransform: "capitalize" }}>
              {categories}
            </StyledTitle>
            <StyledBox>
              {products &&
                products.map(({ name, currentPrice, imageUrls, _id, itemNo }) => (
                  <ProductCard key={_id} title={name} price={currentPrice} url={imageUrls[0]} alt={name} id={itemNo} />
                ))}
            </StyledBox>
            <Stack spacing={2}>
              <Pagination count={Math.ceil(count / perPage)} page={startPage} onChange={handlePageChange} />
            </Stack>
          </Box>
        )}
        {products.length === 0 && <EmptyProductPage />}
      </StyledContainer>
    </>
  );
}

export default ProductList;
