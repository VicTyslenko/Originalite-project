import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../services/api/axios";
import { type OrderProps } from "../models";


export const ordersFetchData = createAsyncThunk(
  "orders/actionFetchData",
  async (params, { rejectWithValue, getState }) => {
    const { auth, tempAuth } = getState();

    const token = auth?.data?.token || tempAuth.tempData?.token;

    try {
      const { data } = await axiosInstance.post("/orders/", params, {
        headers: {
          Authorization: token,
        },
      });

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateOrder = createAsyncThunk(
  "orders/actionFetchData",
  async ({ orderId, params }, { getState, rejectWithValue }) => {
    const { auth, tempAuth } = getState();

    const token = auth?.data?.token || tempAuth.tempData?.token;

    try {
      const { data } = await axiosInstance.put(`/orders/${orderId}`, params, {
        headers: {
          Authorization: token,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
