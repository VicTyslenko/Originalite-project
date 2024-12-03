import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../services/api/axios';

export const usersFetchData = createAsyncThunk('users/usersFetch', async () => {
	const { data } = await axiosInstance.get('/customers');

	return data;
});
