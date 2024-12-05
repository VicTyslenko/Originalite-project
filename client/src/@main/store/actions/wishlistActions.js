import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	deleteProductFromWishlist as fetchProductFromWishlist,
	addProductToWishlist as fetchProductToWishlist,
	getWishlist as fetchWishlist,
} from "../../../services/api/wishlistApi";

export const getWishlist = createAsyncThunk("wishlist/getWishlist", async (_, { getState }) => {
	const { auth } = getState();

	const { data } = await fetchWishlist({
		headers: {
			Authorization: auth.data?.token,
		},
	});
	return data;
});

export const addProductToWishlist = createAsyncThunk("wishlist/addProductToWishlist", async (id, { getState }) => {
	const { auth } = getState();

	const { data } = await fetchProductToWishlist(id, {
		headers: {
			Authorization: auth.data?.token,
		},
	});
	return data;
});

export const deleteProductFromWishlist = createAsyncThunk(
	"wishlist/deleteProductFromWishlist",
	async (id, { getState }) => {
		const { auth } = getState();

		const { data } = await fetchProductFromWishlist(id, {
			headers: {
				Authorization: auth.data?.token,
			},
		});
		return data;
	},
);
