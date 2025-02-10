import { createSlice } from "@reduxjs/toolkit";

import { actionFetchTempAuth } from "../actions/authActions";
import { updateCustomer } from "../actions/customersActions";

const initialState = {
	tempData: null,
	error: null,
};

const tempAuthSlice = createSlice({
	name: "tempAuth",
	initialState,
	reducers: {
		setTempAuth(state, action) {
			state.tempData = action.payload;
		},
		clearTempAuth(state) {
			state.tempData = null;
		},
	},

	extraReducers: builder => {
		builder.addCase(actionFetchTempAuth.pending, state => {
			state.tempData = null;
		});

		builder.addCase(actionFetchTempAuth.fulfilled, (state, action) => {
			console.log("payload", action.payload);
			state.tempData = action.payload;
		});
		builder.addCase(actionFetchTempAuth.rejected, (state, action) => {
			state.error = action.payload;
		});

		builder.addCase(updateCustomer.fulfilled, (state, action) => {
			state.tempData = action.payload;
		});
		builder.addCase(updateCustomer.rejected, (state, action) => {
			state.error = action.payload;
		});
	},
});

export const { setTempAuth, clearTempAuth } = tempAuthSlice.actions;
export default tempAuthSlice.reducer;
