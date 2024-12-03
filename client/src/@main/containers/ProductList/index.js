import { useEffect, useState } from 'react';
import { Box, Pagination, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getProductList } from '../../store/actions/productListActions';
import { selectProductList, selectCount } from '../../store/selectors/productListSelectors';
import { selectMinPrice, selectMaxPrice, selectFilterColors, selectFilterCategories } from '../../store/selectors/filterSelector';

import EmptyProductPage from './components/EmptyProductPage/EmptyProductPage';
import ProductCard from './components/ProductCard';
import ProductFilters from './components/ProductFilters';
import { StyledContainer, StyledBox, StyledTitle } from './ProductList.styles';

const perPage = 6;

function ProductList() {
	const [startPage, setPage] = useState(1);
	const { category } = useParams();

	const products = useSelector(selectProductList);
	const count = useSelector(selectCount);
	const minPrice = useSelector(selectMinPrice);
	const maxPrice = useSelector(selectMaxPrice);
	const colors = useSelector(selectFilterColors);
	const categories = useSelector(selectFilterCategories);

	const dispatch = useDispatch();

	const handleChange = (event, value) => {
		setPage(value);
	};

	const isNotData = products.length === 0;

	useEffect(() => {
		dispatch(getProductList({
			startPage,
			perPage,
			minPrice,
			maxPrice,
			colors,
			categories,
			male: category,
		}));
		window.scrollTo(0, 0);
	}, [startPage, dispatch, minPrice, maxPrice, colors, categories, category]);

	return (
		<>
			<StyledContainer maxWidth="lg">
				<ProductFilters />
				{!isNotData && (
					<Box sx={{ pb: '30px' }}>
						<StyledTitle variant="title" component="div" sx={{textTransform: "capitalize"}}>
							{categories}
						</StyledTitle>
						<StyledBox>
							{products && products.map(({ name, currentPrice, imageUrls, _id, itemNo }) => (
								<ProductCard
									key={_id}
									title={name}
									price={currentPrice}
									url={imageUrls[0]}
									alt={name}
									id={itemNo} />
							))}
						</StyledBox>
						<Stack spacing={2}>
							<Pagination count={Math.ceil(count/perPage)} page={startPage} onChange={handleChange} />
						</Stack>
					</Box>
				)}
				{isNotData && (
					<EmptyProductPage />
				)}
			</StyledContainer>
		</>
	);
}

ProductList.propTypes = {
	title: PropTypes.string,
	articul: PropTypes.number,
	price: PropTypes.number,
	colors: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			color: PropTypes.string,
			colorHash: PropTypes.string,
		}),
	),
	sizes: PropTypes.arrayOf(PropTypes.number),
	productDetails: PropTypes.string,
	productDelivery: PropTypes.string,
};

export default ProductList;
