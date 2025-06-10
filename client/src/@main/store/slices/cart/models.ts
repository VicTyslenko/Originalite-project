import type { ProductModels } from "shared/models/products.models";

export type InitialProps = {
  data: ProductModels[] | null;
  loader: boolean;
};
