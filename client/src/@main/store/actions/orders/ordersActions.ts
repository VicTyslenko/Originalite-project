import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicInstance } from "services/api/axios";
import privateInstance from "services/api/axios";

import type { OrderModel } from "../../slices/orders/models";
import type { OrdersParamsProps, UpdateOrderProps } from "./models";

export const ordersFetchData = createAsyncThunk<OrderModel, OrdersParamsProps>(
  "orders/actionFetchData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await publicInstance.post("/orders/", params);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateOrder = createAsyncThunk<OrderModel, UpdateOrderProps>(
  "orders/actionFetchData",
  async ({ orderId, params }, { rejectWithValue }) => {
    try {
      const { data } = await privateInstance.put(`/orders/${orderId}`, params);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
