import { Box, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getProductList } from "../../store/actions/productListActions";
import { StyledBox, StyledContainer, StyledTitle } from "./StyledProductList";
import EmptyProductPage from "./components/EmptyProductPage/EmptyProductPage";
import ProductCard from "./components/ProductCard";
import ProductFilters from "./components/ProductFilters";

const perPage = 6;

function ProductList() {
	const dispatch = useDispatch();

	const [startPage, setPage] = useState(1);
	const { category } = useParams();

	const products = useSelector(state => state.productList.data);
	const count = useSelector(state => state.productList.count);
	const minPrice = useSelector(state => state.filters.minPrice);
	const maxPrice = useSelector(state => state.filters.maxPrice);
	const colors = useSelector(state => state.filters.colors);
	const categories = useSelector(state => state.filters.categories);

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
