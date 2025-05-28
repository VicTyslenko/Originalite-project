import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteProductFromWishlist as fetchProductFromWishlist,
  addProductToWishlist as fetchProductToWishlist,
  getWishlist as fetchWishlist,
} from "../../../services/api/wishlistApi";
import type { WishlistProps } from "../slices/wishlist/models";

export const getWishlist = createAsyncThunk<WishlistProps, void>("wishlist/getWishlist", async () => {
  const { data } = await fetchWishlist();

  return data;
});

export const addProductToWishlist = createAsyncThunk<WishlistProps, string>(
  "wishlist/addProductToWishlist",
  async id => {
    try {
      const { data } = await fetchProductToWishlist({
        id,
      });
      return data;
    } catch (error) {
      console.error("Add product to wishlist error", error);
    }
  },
);
export type WishlistResponse = WishlistProps | { products: [] };

export const deleteProductFromWishlist = createAsyncThunk<WishlistResponse, string>(
  "wishlist/deleteProductFromWishlist",
  async id => {
    const { data } = await fetchProductFromWishlist({
      id,
    });

    return data;
  },
);
