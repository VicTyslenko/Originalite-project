import type { ProductData } from "shared/models/products.models";
import type { UserData } from "shared/models/user.models";

export type WishlistProps = {
  customerId: UserData;
  date: string | Date;
  id: string;
  products: ProductData[];
};
