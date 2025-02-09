import { createSlice } from "@reduxjs/toolkit";

import { actionFetchTempAuth } from "../actions/authActions";
import { updateCustomer } from "../actions/customersActions";

const initialState = {
	tempData: null,
	errorMessage: null,
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
			console.log("action payload", action.payload);
			state.tempData = action.payload;
		});
		builder.addCase(actionFetchTempAuth.rejected, (state, action) => {
			console.log("error message", action.payload);
			state.errorMessage = action.payload;
		});

		builder.addCase(updateCustomer.fulfilled, (state, action) => {
			console.log("updated user payload", action.payload);
			state.tempData = action.payload;
		});
	},
});

export const { setTempAuth, clearTempAuth } = tempAuthSlice.actions;
export default tempAuthSlice.reducer;
