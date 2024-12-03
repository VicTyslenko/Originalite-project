import { createAsyncThunk } from '@reduxjs/toolkit';

import { getProductsList as fetchProductList } from '../../../services/api/productsApi';

export const getProductList = createAsyncThunk(
	'productList/getProductList',
	async ({startPage, perPage, minPrice, maxPrice, colors, categories, male}) => {

		const { data } = await fetchProductList({
			startPage,
			perPage,
			minPrice,
			maxPrice,
			colors,
			categories,
			male
		});

	return data;
});
