import { createSlice } from "@reduxjs/toolkit";

import { actionFetchAuth } from "../actions/authActions";
import { updateCustomer } from "../actions/customersActions";
import { registerFetchData } from "../actions/registrationActions";

const initialState = {
	data: null,
	status: "loading",
	error: null,
	userData: null,
};

const authReducer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearDataAuth(state) {
			state.data = null;
		},
		clearErrorAuth(state) {
			state.error = null;
		},
		clearUserData(state) {
			state.userData = null;
		},
	},

	extraReducers: builder => {
		builder.addCase(registerFetchData.pending, state => {
			state.status = "loading";
			state.data = null;
		});
		builder.addCase(registerFetchData.fulfilled, (state, action) => {
			state.status = "loaded";
			state.data = action.payload;
		});
		builder.addCase(registerFetchData.rejected, (state, { payload }) => {
			state.status = "error";
			state.error = payload;
		});

		builder.addCase(actionFetchAuth.pending, state => {
			state.status = "loading";
			state.data = null;
		});
		builder.addCase(actionFetchAuth.fulfilled, (state, action) => {
			state.status = "loaded";
			state.data = action.payload;
		});
		builder.addCase(actionFetchAuth.rejected, (state, { payload }) => {
			state.status = "error";
			state.error = payload;
		});

		builder.addCase(updateCustomer.fulfilled, (state, action) => {
			state.data = action.payload;
			console.log("data response", action.payload);
			state.error = null;
		});

		builder.addCase(updateCustomer.rejected, (state, action) => {
			state.error = action.payload;
		});
	},
});

export const { clearDataAuth, clearErrorAuth, clearUserData } = authReducer.actions;
export default authReducer.reducer;
