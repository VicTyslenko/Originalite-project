import type { ProductModels } from "./products.models";

export interface CartProps {
  products: ProductModels[] | null;
}
