import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useGetParams = () => {
  const products = useStoreSelector(state => state.productList.products);

  const count = useStoreSelector(state => state.productList.productsQuantity);

  const minPrice = useStoreSelector(state => state.filters.minPrice);

  const maxPrice = useStoreSelector(state => state.filters.maxPrice);

  const colors = useStoreSelector(state => state.filters.colors);

  const categories = useStoreSelector(state => state.filters.categories);

  return { count, minPrice, maxPrice, colors, categories, products };
};
