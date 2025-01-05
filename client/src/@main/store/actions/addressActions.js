import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../services/api/axios";

export const addressFetchData = createAsyncThunk(
	"address/actionFetchData",
	async (params, { rejectWithValue, getState }) => {
		const { auth, registration } = getState();
		
		const token = auth?.data?.token || registration?.data?.token;

		if (!token) {
			return rejectWithValue("Authorization token is missing");
		}
		try {
			const { data } = await axiosInstance.post("/orders/", params, {
				headers: {
					Authorization: token,
				},
			});

			return data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	},
);
