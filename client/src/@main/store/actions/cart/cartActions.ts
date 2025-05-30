import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CartProps } from "shared/models/cart.models";
import { type RootState } from "store";

import {
  getCart as fetchCart,
  decreaseQuantity as fetchDecreaseQuantity,
  deleteCart as fetchDeleteCart,
  deleteProductFromCart as fetchProductFromCart,
  addProductToCart as fetchProductToCart,
} from "../../../../services/api/cartApi";

// CartProps types defined for returned data from server, void as a second arg(we don't pass any arguments in this function)

export const getCart = createAsyncThunk<CartProps, void, { rejectValue: { message: string } }>(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCart();

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addProductToCart = createAsyncThunk<CartProps, string, { state: RootState }>(
  "cart/addProductToCart",
  async (id, { getState }) => {
    const { auth, product, cart } = getState();

    if (auth.data !== null) {
      const { data } = await fetchProductToCart({
        id,

        data: {
          size: product.currentSize,
          color: product.currentColor,
        },
      });

      return data;
    } else {
      const products = cart?.data.find(item => item.product._id === id)
        ? cart.data.map(item => (item.product._id === id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item))
        : [
            ...cart.data,
            {
              product: product.data,
              cartQuantity: 1,
              size: product.currentSize,
              color: product.currentColor,
            },
          ];

      return { products };
    }
  },
);

export const decrementItemInCart = createAsyncThunk<CartProps, string, { state: RootState }>(
  "cart/decreaseQuantity",
  async (id, { getState }) => {
    const { auth, cart } = getState();

    const productInCart = cart.data.find(item => item.product._id === id);

    if (productInCart && productInCart.cartQuantity > 1) {
      if (auth.data !== null) {
        const { data } = await fetchDecreaseQuantity({
          id,
        });

        return data;
      } else {
        const updatedProducts = cart.data.map(item =>
          item.product._id === id ? { ...item, cartQuantity: item.cartQuantity - 1 } : item,
        );
        return { products: updatedProducts };
      }
    } else {
      return { products: cart.data };
    }
  },
);

export const deleteProductFromCart = createAsyncThunk<CartProps, string, { state: RootState }>(
  "cart/deleteProductFromCart",
  async (id, { getState }) => {
    const { auth, cart } = getState();

    if (auth.data !== null) {
      const { data } = await fetchProductFromCart({
        id,
      });

      return data;
    } else {
      const products = cart.data.filter(({ product }) => product._id !== id);

      return { products };
    }
  },
);
type DeleteCartProps = {
  message: string;
};

export const deleteCart = createAsyncThunk<DeleteCartProps, void>("cart/deleteCart", async (_, { rejectWithValue }) => {
  try {
    const { data } = await fetchDeleteCart();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
