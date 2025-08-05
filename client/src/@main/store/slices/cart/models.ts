import type { Products } from "shared/models/products.models";

export interface InitialProps {
  loader: boolean;
  totalSum: number;
  products: Products;
}
