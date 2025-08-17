import { getCart } from "@main/store/actions/cart/cartActions";
import { closeModal } from "@main/store/slices/modal/modalSlice";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import type { ShoppingBagProps } from "./models";

export const useShoppingBag = ({ isShoppingBag }: ShoppingBagProps) => {
  const dispatch = useStoreDispatch();

  const navigate = useNavigate();

  const dataProducts = useStoreSelector(state => state.cart.products);
  const loadingCartData = useStoreSelector(state => state.cart.loader);

  const isLoggedOut = useStoreSelector(state => state.auth.isLoggedOut);

  const handleBasketClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.currentTarget;
    button.blur();

    dispatch(closeModal());
    navigate("/shopping-cart");
  };

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const allPrices = dataProducts?.map(el => (el.product ? el.product.currentPrice * el.cartQuantity : 0));

  const orderValue = allPrices?.reduce((sum, el) => sum + el, 0) || 0;
  // Get user cart data server request:
  useEffect(() => {
    if (isShoppingBag && !isLoggedOut) {
      dispatch(getCart());
    }
  }, [isShoppingBag, isLoggedOut]);

  return { handleBasketClick, dataProducts, handleModalClose, loadingCartData, orderValue };
};
