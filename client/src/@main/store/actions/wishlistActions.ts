import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CartProps } from "shared/models/cart.models";
import type { RootState } from "store";

import {
  deleteProductFromWishlist as fetchProductFromWishlist,
  addProductToWishlist as fetchProductToWishlist,
  getWishlist as fetchWishlist,
} from "../../../services/api/wishlistApi";

export const getWishlist = createAsyncThunk<CartProps, void, { state: RootState }>(
  "wishlist/getWishlist",
  async (_, { getState }) => {
    const { auth, tempAuth } = getState();
    const token = auth.data?.token || tempAuth.tempData?.token;
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

export const addProductToWishlist = createAsyncThunk<CartProps, string, { state: RootState }>(
  "wishlist/addProductToWishlist",
  async (id, { getState }) => {
    const { auth, tempAuth } = getState();
    const token = auth.data?.token || tempAuth.tempData?.token;

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

type EmptyWishlistProps = {
  products: [];
};
export const deleteProductFromWishlist = createAsyncThunk<CartProps | EmptyWishlistProps, string, { state: RootState }>(
  "wishlist/deleteProductFromWishlist",
  async (id, { getState }) => {
    const { auth, tempAuth } = getState();

    const token = auth.data?.token || tempAuth.tempData?.token;

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
