import type { ProductData } from "shared/models/products.models";

export type ProductListProps = {
  products: ProductData[] | null;
  productsQuantity: number;
};
