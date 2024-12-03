import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../services/api/axios';

export const addressFetchData = createAsyncThunk('address/actionFetchData', async (params, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.post('/orders/', params);

		return data;
	} catch (err) {
		
		return rejectWithValue(err.response.data);
	}
});
