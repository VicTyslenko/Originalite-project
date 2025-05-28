import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "store";

import axiosInstance from "../../../../services/api/axios";
import type { OrderModel } from "../../slices/orders/models";
import type { OrdersParamsProps, UpdateOrderProps } from "./models";

export const ordersFetchData = createAsyncThunk<OrderModel, OrdersParamsProps, { state: RootState }>(
  "orders/actionFetchData",
  async (params, { rejectWithValue, getState }) => {
    const { auth } = getState();

    const token = auth?.data?.accessToken;

    try {
      const { data } = await axiosInstance.post("/orders/", params, {
        headers: token ? { Authorization: token } : {},
      });

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateOrder = createAsyncThunk<OrderModel, UpdateOrderProps, { state: RootState }>(
  "orders/actionFetchData",
  async ({ orderId, params }, { getState, rejectWithValue }) => {
    const { auth } = getState();

    const token = auth?.data?.accessToken;

    try {
      const { data } = await axiosInstance.put(`/orders/${orderId}`, params, {
        headers: token ? { Authorization: token } : {},
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
