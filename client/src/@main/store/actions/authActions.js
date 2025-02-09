import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../services/api/axios";

export const actionFetchAuth = createAsyncThunk("auth/actionFetchData", async (params, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.post("/customers/login", params);

		return data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});
// server request to login user and save to session storage
export const actionFetchTempAuth = createAsyncThunk("auth/actionFetchTempData", async (params, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.post("/customers/login", params);

		return data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});
