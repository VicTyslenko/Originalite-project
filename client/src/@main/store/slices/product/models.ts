import type { ProductData } from "shared/models/products.models";

export type ProductProps = {
  data: ProductData | null;
  currentColor: string | null;
  currentSize: string | null;
};
