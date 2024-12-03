import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	minPrice: null,
	maxPrice: null,
	colors: [],
	categories: null,
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFilters: (state, action) => {
			return {
				...state,
				...action.payload
			}
		}
	},
});

export const { setFilters } = filterSlice.actions;

export default filterSlice.reducer;
