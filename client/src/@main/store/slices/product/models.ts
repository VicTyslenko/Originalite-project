import type { ProductData } from "shared/models/products.models";

export type ProductProps = {
  product: ProductData | null;
  currentColor: string | null;
  currentSize: string | null;
};
