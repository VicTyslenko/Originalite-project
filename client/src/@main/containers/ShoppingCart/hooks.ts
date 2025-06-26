import { useEffect, useMemo, useState } from "react";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useShoppingCart = () => {
  const cart = useStoreSelector(state => state.cart.products);

  const orderValue = useMemo(() => {
    return (
      cart?.reduce((sum, item) => {
        const itemPrice = item.product.currentPrice * item.cartQuantity;

        return sum + itemPrice;
      }, 0) ?? 0
    );
  }, [cart]);

  return { cart, orderValue };
};
