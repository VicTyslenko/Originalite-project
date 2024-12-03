import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../services/api/axios';

export const postProductFetch = createAsyncThunk('product/newProductData', async (params, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.post('/products/', params);

		return data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});
