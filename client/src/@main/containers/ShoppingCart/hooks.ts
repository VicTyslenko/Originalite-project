import { useEffect, useState } from "react";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useShoppingCart = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const [orderValue, setOrderValue] = useState(0);
  const cart = useStoreSelector(state => state.cart.products);
console.log()
  const itemPrice = cart?.map(el => el.product.currentPrice * el.cartQuantity);

  useEffect(() => {
    setOrderValue(() => {
      const result = itemPrice?.reduce((a, b) => a + b) ?? 0;

      return result;
    });
  }, [itemPrice]);

  return { totalPrice, cart, orderValue };
};
