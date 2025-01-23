import { createSlice } from "@reduxjs/toolkit";

import { actionFetchTempAuth } from "../actions/authActions";

const initialState = {
	tempData: null,
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
		builder.addCase(actionFetchTempAuth.fulfilled, (state, action) => {
			state.tempData = action.payload;
		});
	},
});

export const { setTempAuth, clearTempAuth } = tempAuthSlice.actions;
export default tempAuthSlice.reducer;
