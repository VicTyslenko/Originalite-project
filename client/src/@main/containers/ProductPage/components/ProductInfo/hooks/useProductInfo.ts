import { addProductToCart, deleteProductFromCart } from "@main/store/actions/cart/cartActions";
import { addProductToWishlist, deleteProductFromWishlist } from "@main/store/actions/wishlistActions";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useCallback, useEffect, useState } from "react";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useProductInfo = ({ id }: { id: string }) => {
  const dispatch = useStoreDispatch();

  const [openTooltip, setOpenTooltip] = useState(false);

  const cart = useStoreSelector(state => state.cart.products);
  const product = useStoreSelector(state => state.product.product);
  const user = useStoreSelector(state => state.auth.data);
  const currentColor = useStoreSelector(state => state.product.currentColor);
  const currentSize = useStoreSelector(state => state.product.currentSize);
  const wishList = useStoreSelector(state => state.wishlist.data);

  const itemInCart = cart?.find(item => item.product._id === product?._id);
  const itemInWishlist = wishList?.find(item => item._id === product?._id);


  const handleClickCart = useCallback(() => {
    if (itemInCart) {
      dispatch(deleteProductFromCart(id));
    } else {
      dispatch(addProductToCart(id));
    }
  }, [itemInCart]);

  const handleClickWishlist = () => {
    if (itemInWishlist) {
      dispatch(deleteProductFromWishlist(id));
    } else {
      dispatch(addProductToWishlist(id));
    }
  };

  const handleOpenTooltip = () => {
    if ((!currentSize || !currentColor) && !itemInCart) {
      setOpenTooltip(true);
    }
  };

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };

  return {
    itemInCart,
    user,
    currentSize,
    currentColor,
    itemInWishlist,
    wishList,
    handleClickCart,
    handleClickWishlist,
    handleOpenTooltip,
    handleCloseTooltip,
    openTooltip,
  };
};
