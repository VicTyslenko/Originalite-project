import { createSlice } from '@reduxjs/toolkit';

import { usersFetchData } from '../actions/usersAction';

const initialState = {
	users: [],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(usersFetchData.pending, (state) => {
			state.status = 'loading';
			state.users = null;
		});
		builder.addCase(usersFetchData.fulfilled, (state, { payload }) => {
			state.status = 'leaded';
			state.users = payload;
		});
		builder.addCase(usersFetchData.rejected, (state) => {
			state.status = 'error';
		});
	},
});

export default usersSlice.reducer;
