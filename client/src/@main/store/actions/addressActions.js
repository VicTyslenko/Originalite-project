import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../services/api/axios";

export const addressFetchData = createAsyncThunk(
	"address/actionFetchData",
	async (params, { rejectWithValue, getState }) => {
		const { auth } = getState();

		try {
			const { data } = await axiosInstance.post("/orders/", params, {
				headers: {
					Authorization: auth.data?.token,
				},
			});

			return data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	},
);
