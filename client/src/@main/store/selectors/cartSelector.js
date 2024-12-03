export const cartDataSelect = (state) => state.cart.data || [];
export const selectIsCart = (state, id) => state.cart.data?.find(({ product }) => id === product?._id)
