import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../services/api/axios";

export const actionFetchAuth = createAsyncThunk("auth/actionFetchData", async (params, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.post("/customers/login", params);

		return data;
	} catch (err) {
		console.log({ error: err.response });
		return rejectWithValue(err.response.data);
	}
});
