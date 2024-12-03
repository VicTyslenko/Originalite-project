import { createSlice } from "@reduxjs/toolkit";
import { getColors } from "../actions/colorsActions";

const initialState = {
	data: [],
};

export const colorsSlice = createSlice({
	name: 'colors',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getColors.fulfilled, (state, action) => {
			state.data = action.payload;
		})
	}
});

export default colorsSlice.reducer;
