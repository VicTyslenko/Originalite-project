import { createAsyncThunk } from "@reduxjs/toolkit";
import { type RootState } from "store";

import {
  getCart as fetchCart,
  decreaseQuantity as fetchDecreaseQuantity,
  deleteCart as fetchDeleteCart,
  deleteProductFromCart as fetchProductFromCart,
  addProductToCart as fetchProductToCart,
} from "../../../../services/api/cartApi";
import { type CartProps } from "./models";

//here CartPrors types defined for returned data from server, void as a second arg(we don't pass any arguments in this function)//
export const getCart = createAsyncThunk<CartProps, void, { state: RootState }>(
  "cart/getCart",
  async (_, { getState }) => {
    const { auth, tempAuth } = getState();
    const token = auth.data?.token || tempAuth.tempData?.token;
    if (token) {
      const { data } = await fetchCart({
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

export const addProductToCart = createAsyncThunk<CartProps, string, { state: RootState }>(
  "cart/addProductToCart",
  async (id, { getState }) => {
    const { auth, product, cart, tempAuth } = getState();

    const token = auth.data?.token || tempAuth.tempData?.token;

    if (auth.data !== null || tempAuth.tempData !== null) {
      const { data } = await fetchProductToCart({
        id,

        data: {
          size: product.currentSize,
          color: product.currentColor,
        },
        config: {
          headers: {
            Authorization: token,
          },
        },
      });

      return data;
    } else {
      const products = cart.data.find(item => item.product._id === id)
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

export const decrementItemInCart = createAsyncThunk("cart/decreaseQuantity", async (id, { getState }) => {
  const { auth, cart, tempAuth } = getState();

  const token = auth.data?.token || tempAuth.tempData?.token;

  const productInCart = cart.data.find(item => item.product._id === id);

  if (productInCart && productInCart.cartQuantity > 1) {
    if (auth.data !== null || tempAuth.tempData !== null) {
      const { data } = await fetchDecreaseQuantity(id, {
        headers: {
          Authorization: token,
        },
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
});

export const deleteProductFromCart = createAsyncThunk<any, string, { state: RootState }>(
  "cart/deleteProductFromCart",
  async (id, { getState }) => {
    const { auth, cart, tempAuth } = getState();

    const token = auth.data?.token || tempAuth.tempData?.token;

    if (auth.data !== null || tempAuth.tempData !== null) {
      const { data } = await fetchProductFromCart({
        id,
        config: {
          headers: {
            Authorization: token,
          },
        },
      });

      return data;
    } else {
      const products = cart.data.filter(({ product }) => product._id !== id);

      return { products };
    }
  },
);

export const deleteCart = createAsyncThunk("cart/deleteCart", async (_, { getState, rejectWithValue }) => {
  const { auth, tempAuth } = getState();

  const token = auth.data?.token || tempAuth.tempData?.token;

  if (!token) {
    return rejectWithValue("Authorization token is missing");
  }
  try {
    const { data } = await fetchDeleteCart({
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
