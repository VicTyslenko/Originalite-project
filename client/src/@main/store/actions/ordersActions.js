import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../services/api/axios";

export const ordersFetchData = createAsyncThunk(
	"orders/actionFetchData",
	async (params, { rejectWithValue, getState }) => {
		const { auth, tempAuth } = getState();

		const token = auth?.data?.token || tempAuth.tempData?.token;

		try {
			const { data } = await axiosInstance.post("/orders/", params, {
				headers: token
					? {
							Authorization: token,
					  }
					: {},
			});

			return data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	},
);
