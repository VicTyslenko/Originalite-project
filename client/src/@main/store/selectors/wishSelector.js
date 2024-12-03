export const wishSelector = (state) => state.wishlist.data;
export const selectIsWishlist = (state, id) => state.wishlist.data?.find((el) => id === el._id);
