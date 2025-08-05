import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useProductInfo = () => {
  const cart = useStoreSelector(state => state.cart.products);
  const product = useStoreSelector(state => state.product.product);

  const user = useStoreSelector(state => state.auth.data);

  const currentColor = useStoreSelector(state => state.product.currentColor);

  const currentSize = useStoreSelector(state => state.product.currentSize);

  const wishList = useStoreSelector(state => state.wishlist.data);

  const itemInCart = cart?.find(item => item.product._id === product?._id) || null;

  const itemInWishlist = wishList?.find(item => item._id === product?._id);

  return { itemInCart, user, currentSize, currentColor, itemInWishlist, wishList };
};
