import { createAsyncThunk } from '@reduxjs/toolkit';

import { getProductById as fetchProductById } from '../../../services/api/productsApi';

export const getProduct = createAsyncThunk(
	'product/getProductById',
	async (itemNo) => {
		const { data } = await fetchProductById(itemNo);

		return data;
	}
);
