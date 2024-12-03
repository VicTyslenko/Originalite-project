import { createSlice } from '@reduxjs/toolkit';
import { getCart, addProductToCart, deleteProductFromCart, deleteCart } from '../actions/cartActions';

const initialState = {
	data: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearUnauthCart(state) {
			state.data = [];
		},
	},

	extraReducers: (builder) => {
		builder.addCase(getCart.fulfilled, (state, action) => {
			state.data = action.payload?.products || [];
		});

		builder.addCase(addProductToCart.fulfilled, (state, action) => {
			const { products } = action.payload;
			state.data = [...products];
		});

		builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
			const { products } = action.payload;

			state.data = [...products];
		});
		builder.addCase(deleteCart.fulfilled, (state, action) => {
			const { products } = action.payload;

			state.data = [...products];
		});
	},
});
export const { clearUnauthCart } = cartSlice.actions;

export default cartSlice.reducer;
