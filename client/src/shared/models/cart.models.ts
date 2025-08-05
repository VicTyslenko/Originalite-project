import type { Products } from "./products.models";

export interface CartProps {
  customerId: string;
  products: Products;
}
