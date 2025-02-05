import { createSlice } from "@reduxjs/toolkit";

import { ordersFetchData } from "../actions/ordersActions";

const initialState = {
	orderId: null,
	data: null,
	status: "loading",
	error: null,
};

const ordersReducer = createSlice({
	name: "orders",
	initialState,
	reducers: {
		removeOrderId(state) {
			state.orderId = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(ordersFetchData.pending, state => {
			state.status = "loading";
			state.data = null;
		});
		builder.addCase(ordersFetchData.fulfilled, (state, { payload }) => {
			state.status = "loaded";
			state.data = payload;
			state.error = null;
			state.orderId = payload.orderId;
		});
		builder.addCase(ordersFetchData.rejected, (state, { payload }) => {
			state.status = "error";
			state.error = payload;
		});
	},
});
export const { removeOrderId } = ordersReducer.actions;
export default ordersReducer.reducer;
