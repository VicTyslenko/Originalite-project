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

// GetCartProps types defined for returned data from server, void as a second arg(we don't pass any arguments in this function)

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

    // if user logged in:
    if (auth.data !== null) {
      const { data } = await fetchProductToCart({
        id,
        data: {
          size: product.currentSize,
          color: product.currentColor,
        },
      });

      return data;
    }
    //if user is not logged in:
    if (!cart?.products?.length) return [{ ...product, cartQuantity: 1 }];

    const existingProduct = cart.products.find(item => item.product._id === id);

    return existingProduct
      ? cart.products.map(item =>
          item.product._id === existingProduct.product._id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item,
        )
      : [...cart.products, { ...product, cartQuantity: 1 }];
  },
);

export const decrementItemInCart = createAsyncThunk<CartProps, string, { state: RootState }>(
  "cart/decreaseQuantity",
  async (id, { getState }) => {
    const { auth, cart } = getState();

    const productInCart = cart.products?.find(item => item.product._id === id);

    if (productInCart && productInCart.cartQuantity > 1) {
      if (auth.data !== null) {
        const { data } = await fetchDecreaseQuantity({
          id,
        });

        return data;
      } else {
        const updatedProducts = cart.products?.map(item =>
          item.product._id === id ? { ...item, cartQuantity: item.cartQuantity - 1 } : item,
        );
        return { products: updatedProducts };
      }
    } else {
      return { products: cart.products };
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
      const products = cart.products?.filter(item => item.product._id !== id);

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
