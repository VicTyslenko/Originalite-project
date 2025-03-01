import type { CartProps } from "@main/store/actions/cart/models";
import { type AxiosResponse } from "axios";

import axiosInstance from "./axios";
import { type ApiProps } from "./models";
import type { ProductParams } from "./models";

export function getCart({ config }: ApiProps): Promise<AxiosResponse<CartProps>> {
  return axiosInstance.get<CartProps>("cart", config);
}
export function deleteCart({ config }: ApiProps) {
  return axiosInstance.delete(`cart`, config);
}
export function decreaseQuantity({ id, config }: ApiProps) {
  return axiosInstance.delete(`cart/product/${id}`, config);
}

export function addProductToCart({ data, id, config }: ProductParams) {
  return axiosInstance.put(`cart/${id}`, data, config);
}

export function deleteProductFromCart({ id, config }: ApiProps) {
  return axiosInstance.delete(`cart/${id}`, config);
}
