import { AxiosError } from "axios";
import type { LoadingStatus } from "shared/models/modal.models";
import type { ProductModels } from "shared/models/products.models";

export type OrderData = {
  address: string;
  guest: boolean;
  customerId?: string;
  canceled: boolean;
  paymentStatus: string;
  date: string;
  firstName: string;
  lastName: string;
  orderNo: string;
  products: ProductModels;
  email: string;
  telephone: string;
  totalSum: number;
  __v: number;
};

export type OrderModel = {
  message: string;
  orderDetails: OrderData;
  orderId: string | null;
};

export type InitialOrderState = {
  data: OrderModel | null;
  status: LoadingStatus;
  error: AxiosError | null;
};
