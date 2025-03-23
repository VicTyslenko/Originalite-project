import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "store";

import {
  deleteProductFromWishlist as fetchProductFromWishlist,
  addProductToWishlist as fetchProductToWishlist,
  getWishlist as fetchWishlist,
} from "../../../services/api/wishlistApi";
import type { WishlistProps } from "../slices/wishlist/models";

export const getWishlist = createAsyncThunk<WishlistProps, void, { state: RootState }>(
  "wishlist/getWishlist",
  async (_, { getState }) => {
    const { auth, tempAuth } = getState();
    const token = auth.data?.accessToken || tempAuth.tempData?.accessToken;
    if (token) {
      const { data } = await fetchWishlist({
        config: {
          headers: {
            Authorization: token,
          },
        },
      });

      return data;
    }
  },
);

export const addProductToWishlist = createAsyncThunk<WishlistProps, string, { state: RootState }>(
  "wishlist/addProductToWishlist",
  async (id, { getState }) => {
    const { auth, tempAuth } = getState();
    const token = auth.data?.accessToken || tempAuth.tempData?.accessToken;

    try {
      const { data } = await fetchProductToWishlist({
        id,
        config: {
          headers: {
            Authorization: token,
          },
        },
      });
      return data;
    } catch (error) {
      console.error("Add product to wishlist error", error);
    }
  },
);
export type WishlistResponse = WishlistProps | { products: [] };

export const deleteProductFromWishlist = createAsyncThunk<WishlistResponse, string, { state: RootState }>(
  "wishlist/deleteProductFromWishlist",
  async (id, { getState }) => {
    const { auth, tempAuth } = getState();

    const token = auth.data?.accessToken || tempAuth.tempData?.accessToken;

    const { data } = await fetchProductFromWishlist({
      id,
      config: {
        headers: {
          Authorization: token,
        },
      },
    });
    console.log("wishlist delete", data);
    return data;
  },
);
