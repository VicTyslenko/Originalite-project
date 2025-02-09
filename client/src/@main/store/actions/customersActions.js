import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../services/api/axios";

export const updateCustomer = createAsyncThunk(
	"customers/updateCustomer",
	async ({ _id, params }, { getState, rejectWithValue }) => {
		const { auth, tempAuth } = getState();

		const token = auth.data?.token || tempAuth?.token;

		try {
			const { data } = await axiosInstance.put(`/customers/${_id}`, params, {
				headers: {
					Authorization: token,
				},
			});

			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const getCustomer = createAsyncThunk("auth/actionFetchUserData", async (_, { getState, rejectWithValue }) => {
	const { auth, tempAuth } = getState();

	const token = auth.data.token || tempAuth.data.token;

	try {
		if (token) {
			const { data } = await axiosInstance.get("/customers/me", {
				headers: {
					Authorization: token,
				},
			});
			return data;
		}
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
