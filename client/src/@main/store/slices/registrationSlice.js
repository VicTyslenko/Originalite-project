import { createSlice } from '@reduxjs/toolkit';

import { registerFetchData } from '../actions/registrationActions';

const initialState = {
	data: null,
	status: 'loading',
	error: null,
};

const registrationReducer = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		clearDataRegister(state) {
			state.data = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerFetchData.pending, (state) => {
			state.status = 'loading';
			state.data = null;
		});
		builder.addCase(registerFetchData.fulfilled, (state, { payload }) => {
			state.status = 'leaded';
			state.data = payload;
		});
		builder.addCase(registerFetchData.rejected, (state, { payload }) => {
			state.status = 'error';
			state.error = payload;
		});
	},
});

export const { clearDataRegister } = registrationReducer.actions;
export default registrationReducer.reducer;
