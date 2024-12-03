import { createSlice } from '@reduxjs/toolkit';

import { postProductFetch } from '../actions/newProductActions';

const initialState = {
	data: null,
	status: 'loading',
	error: null,
};

const newProductSlice = createSlice({
	name: 'newProduct',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(postProductFetch.pending, (state) => {
			state.status = 'loading';
			state.data = null;
		});
		builder.addCase(postProductFetch.fulfilled, (state, { payload }) => {
			state.status = 'leaded';
			state.data = payload;
		});
		builder.addCase(postProductFetch.rejected, (state, { payload }) => {
			state.status = 'error';
			state.error = payload;
		});
	},
});

export default newProductSlice.reducer;
