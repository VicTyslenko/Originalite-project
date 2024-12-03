import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	getCart as fetchCart,
	addProductToCart as fetchProductToCart,
	deleteProductFromCart as fetchProductFromCart,
	deleteCart as fetchDeleteCart,
} from '../../../services/api/cartApi';

export const getCart = createAsyncThunk('cart/getCart', async (_, { getState }) => {
	const { auth } = getState();

	const { data } = await fetchCart({
		headers: {
			Authorization: auth.data?.token,
		},
	});
	return data;
});

export const addProductToCart = createAsyncThunk('cart/addProductToCart', async (id, { getState }) => {
	const { auth, product, cart } = getState();

	if (auth.data !== null) {
		const { data } = await fetchProductToCart(
			id,
			{
				size: product.currentSize,
				color: product.currentColor,
				cartQuantity: product.cartQuantity,
			},
			{
				headers: {
					Authorization: auth.data.token,
				},
			},
		);

		return data;
	} else {
		const products = [
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
});

export const deleteProductFromCart = createAsyncThunk('cart/deleteProductFromCart', async (id, { getState }) => {
	const { auth, cart } = getState();

	if (auth.data !== null) {
		const { data } = await fetchProductFromCart(id, {
			headers: {
				Authorization: auth.data?.token,
			},
		});

		return data;
	} else {
		const products = cart.data.filter(({ product }) => product._id !== id);

		return { products };
	}
});
export const deleteCart = createAsyncThunk('cart/deleteCart', async (user, { getState }) => {
	const { auth, cart } = getState();

	if (auth.data !== null) {
		const { data } = await fetchDeleteCart(
			{},
			{
				headers: {
					Authorization: auth.data?.token,
				},
				user,
			},
		);

		return data;
	}
});
