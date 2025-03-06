import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getProductList } from "../../actions/productListActions";
import { type ProductListProps } from "./models";

const initialState: ProductListProps = {
  products: [],
  productsQuantity: 0,
};

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getProductList.fulfilled, (state, action: PayloadAction<ProductListProps>) => {
      const { products, productsQuantity } = action.payload;

      state.products = products;

      state.productsQuantity = productsQuantity;
    });
  },
});

export default productListSlice.reducer;
