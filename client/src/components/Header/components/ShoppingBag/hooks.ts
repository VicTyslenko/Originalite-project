import { getCart } from "@main/store/actions/cart/cartActions";
import { closeModal } from "@main/store/slices/modal/modalSlice";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import type { ShoppingBagProps } from "./models";

export const useShoppingBag = ({ isShoppingBag }: ShoppingBagProps) => {
  const dispatch = useStoreDispatch();

  const { user } = useUserData();

  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const isLoggedOut = useStoreSelector(state => state.auth.isLoggedOut);

  const dataProducts = useStoreSelector(state => state.cart.products);
  const loader = useStoreSelector(state => state.cart.loader);

  // const priceItem = dataProducts?.map(data => {
  //   console.log(data.product);
  // });
  const priceItem = dataProducts?.map(({ product, cartQuantity }) => product && product.currentPrice * cartQuantity);

  const handleBasketClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.currentTarget;
    button.blur();

    dispatch(closeModal());
    navigate("/shopping-cart");
  };

  const handleModalClose = () => {
    dispatch(closeModal());
  };
  useEffect(() => {
    if (priceItem) {
      setTotalPrice(priceItem.reduce((accum, item) => accum + item, 0));
    }
  }, [priceItem]);

  useEffect(() => {
    if (isShoppingBag && !isLoggedOut) {
      dispatch(getCart());
    }
  }, [isShoppingBag, isLoggedOut]);

  return { totalPrice, handleBasketClick, dataProducts, handleModalClose, loader };
};
