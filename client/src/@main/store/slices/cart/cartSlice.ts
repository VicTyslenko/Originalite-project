import {
  addProductToCart,
  decrementItemInCart,
  deleteCart,
  deleteProductFromCart,
  getCart,
} from "@main/store/actions/cart/cartActions";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type CartProps } from "shared/models/cart.models";

import type { InitialProps } from "./models";

const initialState: InitialProps = {
  products: [],
  loader: false,
  totalSum: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.products = [];
    },
    setTotalSum(state, action) {
      state.totalSum = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(getCart.pending, state => {
      state.products = [];
      state.loader = true;
    });

    builder.addCase(getCart.fulfilled, (state, action: PayloadAction<CartProps>) => {
      state.products = action.payload?.products || [];

      state.loader = false;
    });

    builder
      .addCase(addProductToCart.pending, state => {
        state.loader = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action: PayloadAction<CartProps>) => {
        const { products } = action.payload;
        state.products = products;
        state.loader = false;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loader = false;
        console.log(" addProductToCart rejected:", action.error);
      });

    builder.addCase(deleteProductFromCart.fulfilled, (state, action: PayloadAction<CartProps>) => {
      const { products } = action.payload;

      state.products = [...(products ?? [])];
    });

    builder.addCase(decrementItemInCart.fulfilled, (state, action: PayloadAction<CartProps>) => {
      state.products = action.payload.products;
    });

    builder.addCase(deleteCart.fulfilled, state => {
      state.products = [];
    });
  },
});
export const { clearCart, setTotalSum } = cartSlice.actions;

export default cartSlice.reducer;
