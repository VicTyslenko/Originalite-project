import axiosInstance from "./axios";
import { type ApiProps } from "./models";
import type { ProductParams } from "./models";

export function getCart({ config }: ApiProps) {
  return axiosInstance.get("cart", config);
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
