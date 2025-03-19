import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ProductData } from "shared/models/products.models";

import { addProductToWishlist, deleteProductFromWishlist, getWishlist } from "../../actions/wishlistActions";
import type { WishlistResponse } from "../../actions/wishlistActions";
import type { WishlistProps } from "./models";

type InitialProps = {
  data: ProductData[];
  loading: boolean;
};

const initialState: InitialProps = {
  data: [],
  loading: false,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getWishlist.pending, state => {
      state.loading = true;
    });

    builder.addCase(getWishlist.fulfilled, (state, action: PayloadAction<WishlistProps>) => {
      state.data = action.payload?.products;
      state.loading = false;
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
