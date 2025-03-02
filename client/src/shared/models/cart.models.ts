import type { ProductModels } from "./products.models";
import type { UserData } from "./user.models";

export interface CartProps {
  customerId: UserData;
  date?: string | Date;
  _id: string;
  products: ProductModels[];
}
