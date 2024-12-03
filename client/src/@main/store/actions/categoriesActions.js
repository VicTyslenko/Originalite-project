import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCategories as fetchCategories } from "../../../services/api/categoriesApi";

export const getCategories = createAsyncThunk(
	'categories/getCategories',
	async () => {
		const { data } = await fetchCategories();
		return data;
});
