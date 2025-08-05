import { getCart } from "@main/store/actions/cart/cartActions";
import { closeModal } from "@main/store/slices/modal/modalSlice";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import type { ShoppingBagProps } from "./models";

export const useShoppingBag = ({ isShoppingBag }: ShoppingBagProps) => {
  const dispatch = useStoreDispatch();
  const { user } = useUserData();
  const accessToken = useStoreSelector(state => state.auth.data?.accessToken);
  const navigate = useNavigate();

  const dataProducts = useStoreSelector(state => state.cart.products);
  const loadingCartData = useStoreSelector(state => state.cart.loader);

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

  // Get user cart data server request:
  useEffect(() => {
    if (isShoppingBag && user) {
      dispatch(getCart());
    }
  }, [isShoppingBag, user]);

  return { handleBasketClick, dataProducts, handleModalClose, loadingCartData, orderValue };
};
