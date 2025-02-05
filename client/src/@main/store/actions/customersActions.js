import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../services/api/axios";

export const updateCustomer = createAsyncThunk(
	"customers/updateCustomer",
	async ({ _id, params }, { getState, rejectWithValue }) => {
		const { auth, tempAuth } = getState();

		const token = auth?.data?.token || tempAuth.tempData?.token;

		try {
			const { data } = await axiosInstance.put(`/customers/${_id}`, params, {
				headers: {
					Authorization: token,
				},
			});
			return data;
		} catch (error) {
			rejectWithValue(error.response.data);
		}
	},
);
