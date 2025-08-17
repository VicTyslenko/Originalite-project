import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useCartData = () => {
  const cartData = useStoreSelector(state => state.cart.products);
  const allPrices = cartData?.map(el => el.product.currentPrice * el.cartQuantity);

  const orderValue = allPrices?.reduce((sum, el) => sum + el, 0) || 0;

  const loadingCartData = useStoreSelector(state => state.cart.loader);

  return { orderValue, cartData, loadingCartData };
};
