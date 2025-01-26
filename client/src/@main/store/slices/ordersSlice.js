import { createSlice } from "@reduxjs/toolkit";

import { ordersFetchData } from "../actions/ordersActions";

const initialState = {
	data: null,
	status: "loading",
	error: null,
};

const ordersReducer = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(ordersFetchData.pending, state => {
			state.status = "loading";
			state.data = null;
		});
		builder.addCase(ordersFetchData.fulfilled, (state, { payload }) => {
			state.status = "leaded";
			state.data = payload;
			state.error = null;
		});
		builder.addCase(ordersFetchData.rejected, (state, { payload }) => {
			state.status = "error";
			state.error = payload;
		});
	},
});

export default ordersReducer.reducer;
