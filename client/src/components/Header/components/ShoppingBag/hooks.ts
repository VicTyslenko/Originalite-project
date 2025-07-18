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

  const isLoggedOut = useStoreSelector(state => state.auth.isLoggedOut);

  const dataProducts = useStoreSelector(state => state.cart.products);
  const loader = useStoreSelector(state => state.cart.loader);

  const handleBasketClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.currentTarget;
    button.blur();

    dispatch(closeModal());
    navigate("/shopping-cart");
  };

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const allPrices = dataProducts?.map(el => el.product.currentPrice * el.cartQuantity);

  const orderValue = allPrices?.reduce((sum, el) => sum + el, 0) || 0;

  useEffect(() => {
    if (isShoppingBag && !isLoggedOut) {
      dispatch(getCart());
    }
  }, [isShoppingBag, isLoggedOut]);

  return { handleBasketClick, dataProducts, handleModalClose, loader, orderValue };
};
