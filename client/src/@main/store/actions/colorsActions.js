import { createAsyncThunk } from "@reduxjs/toolkit";

import { getColors as fetchColors } from "../../../services/api/colorsApi";

export const getColors = createAsyncThunk(
	'colors/getColors',
	async () => {
		const { data } = await fetchColors();
		return data;
});
