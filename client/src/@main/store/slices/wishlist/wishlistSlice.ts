import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ProductData } from "shared/models/products.models";

import { addProductToWishlist, deleteProductFromWishlist, getWishlist } from "../../actions/wishlistActions";
import type { WishlistResponse } from "../../actions/wishlistActions";
import type { WishlistProps } from "./models";

type InitialProps = {
  data: ProductData[];
};
const initialState: InitialProps = {
  data: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getWishlist.fulfilled, (state, action: PayloadAction<WishlistProps>) => {
      state.data = action.payload?.products;
    });

    builder.addCase(addProductToWishlist.fulfilled, (state, action: PayloadAction<WishlistProps>) => {
      if (action.payload) {
        const { products } = action.payload;
        state.data = products;
      }
    });

    builder.addCase(deleteProductFromWishlist.fulfilled, (state, action: PayloadAction<WishlistResponse>) => {
      const { products } = action.payload;

      state.data = products;
    });
  },
});

export default wishlistSlice.reducer;
