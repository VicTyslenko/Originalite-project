import type { AddressProps } from "@profile/containers/AdressDetails/models";
import type { ProductModels } from "shared/models/products.models";

export type OrdersParamsProps = {
  customerId: string | null;
  products: ProductModels[];
} & AddressProps;

export type SubmitProps = {
  values: AddressProps;
  resetForm: () => void;
};

export type UpdateOrderProps = {
  orderId: string | null;
  params: {
    email: string;
    letterSubject: string;
    letterHtml: string;
    paymentStatus: string;
  };
};
