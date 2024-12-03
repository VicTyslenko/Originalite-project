import { createSlice } from "@reduxjs/toolkit";
import { getWishlist, addProductToWishlist, deleteProductFromWishlist } from "../actions/wishlistActions";

const initialState = {
	data: [],
};

export const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWishlist.fulfilled, (state, action) => {
			state.data = action.payload?.products || []
		})

		builder.addCase(addProductToWishlist.fulfilled, (state, action) => {
			const { products } = action.payload;

			state.data = [...products];
		})

		builder.addCase(deleteProductFromWishlist.fulfilled, (state, action) => {
			const { products } = action.payload;

			state.data = [...products];
		})
	}
});

export default wishlistSlice.reducer;
