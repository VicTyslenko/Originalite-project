import { getProduct } from "@main/store/actions/productActions";
import { createSlice } from "@reduxjs/toolkit";

import type { ProductProps } from "./models";

const initialState: ProductProps = {
  data: null,
  currentColor: null,
  currentSize: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSize: (state, action) => {
      state.currentSize = action.payload;
    },
    setColor: (state, action) => {
      state.currentColor = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.data = { ...action.payload };
    });
  },
});

export const { setSize, setColor } = productSlice.actions;

export default productSlice.reducer;
