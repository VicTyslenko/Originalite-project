import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../actions/categoriesActions";

const initialState = {
	data: [],
};

export const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCategories.fulfilled, (state, action) => {
			state.data = action.payload;
		})
	}
});

export default categoriesSlice.reducer;
