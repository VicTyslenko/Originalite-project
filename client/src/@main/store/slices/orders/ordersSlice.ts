import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ordersFetchData } from "../../actions/orders/ordersActions";
import { type InitialOrderState } from "./models";

const initialState: InitialOrderState = {
  data: null,
  status: "loading",
  error: null,
};

const ordersReducer = createSlice({
  name: "orders",

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder.addCase(ordersFetchData.pending, state => {
      state.status = "loading";
      state.data = null;
    });

    builder.addCase(ordersFetchData.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.data = payload;

      state.error = null;

      console.log("new order", payload);
    });

    builder.addCase(ordersFetchData.rejected, (state, { payload }) => {
      state.status = "error";

      state.error = payload as AxiosError;
    });
  },
});

export default ordersReducer.reducer;
