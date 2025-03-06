import type { ProductData } from "shared/models/products.models";
import type { UserData } from "shared/models/user.models";

export type WishlistProps = {
  customerId: UserData;
  date: string | Date;
  _id: string;
  products: ProductData[];
};


