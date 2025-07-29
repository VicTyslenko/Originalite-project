import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useGetWishlist = () => {
  const wishList = useStoreSelector(state => state.wishlist.data);

  const isLoading = useStoreSelector(state => state.wishlist.loading);

  const cart = useStoreSelector(state => state.cart.products);

  return { wishList, isLoading, cart };
};
