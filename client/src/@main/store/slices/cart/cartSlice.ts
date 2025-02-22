import {
  addProductToCart,
  decrementItemInCart,
  deleteCart,
  deleteProductFromCart,
  getCart,
} from "@main/store/actions/cartActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.data = action.payload?.products || [];
    });

    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      const { products } = action.payload;

      state.data = [...products];
    });

    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
      const { products } = action.payload;

      state.data = [...products];
    });

    builder.addCase(decrementItemInCart.fulfilled, (state, action) => {
      state.data = action.payload.products;
    });

    builder.addCase(deleteCart.fulfilled, state => {
      state.data = [];
    });
  },
});
export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
