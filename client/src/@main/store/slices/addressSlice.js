import { createSlice } from '@reduxjs/toolkit';

import { addressFetchData } from '../actions/addressActions';

const initialState = {
	data: null,
	status: 'loading',
	error: null,
};

const addressReducer = createSlice({
	name: 'address',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addressFetchData.pending, (state) => {
			state.status = 'loading';
			state.data = null;
		});
		builder.addCase(addressFetchData.fulfilled, (state, { payload }) => {
			state.status = 'leaded';
			state.data = payload;
			console.log(payload)
		});
		builder.addCase(addressFetchData.rejected, (state, { payload }) => {
			state.status = 'error';
			state.error = payload;
		});
	},
});

export default addressReducer.reducer;
