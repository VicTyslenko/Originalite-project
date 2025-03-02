import {
  addProductToCart,
  decrementItemInCart,
  deleteCart,
  deleteProductFromCart,
  getCart,
} from "@main/store/actions/cart/cartActions";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { CartProps } from "shared/models/cart.models";

import type { InitialProps } from "./models";

const initialState: InitialProps = {
  data: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.data = [];
    },
  },

  extraReducers: builder => {
    builder.addCase(getCart.fulfilled, (state, action: PayloadAction<CartProps | undefined>) => {
      state.data = action.payload?.products || [];
    });

    builder.addCase(addProductToCart.fulfilled, (state, action: PayloadAction<CartProps>) => {
      const { products } = action.payload;

      state.data = [...products];
    });

    builder.addCase(deleteProductFromCart.fulfilled, (state, action: PayloadAction<CartProps>) => {
      const { products } = action.payload;

      state.data = [...products];
    });

    builder.addCase(decrementItemInCart.fulfilled, (state, action: PayloadAction<CartProps>) => {
      state.data = action.payload.products;
    });

    builder.addCase(deleteCart.fulfilled, state => {
      state.data = [];
    });
  },
});
export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
