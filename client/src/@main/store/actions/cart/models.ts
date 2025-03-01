import type { ProductModels } from "shared/models/products.models";
import type { UserData } from "shared/models/user.models";

export type CartProps = {
  customerId: UserData;
  date?: string | Date;
  _id: string;
  products: ProductModels[];
};

export type DeleteCartProps = {
  message: string;
};
