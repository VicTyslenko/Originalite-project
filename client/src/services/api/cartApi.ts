import { type AxiosResponse } from "axios";
import type { CartProps } from "shared/models/cart.models";

import privateInstance from "./axios";
import { type ApiProps } from "./models";
import type { ProductParams } from "./models";

export function getCart(): Promise<AxiosResponse<CartProps>> {
  return privateInstance.get<CartProps>("cart");
}
export function deleteCart({ config }: ApiProps) {
  return privateInstance.delete(`cart`, config);
}
export function decreaseQuantity({ id, config }: ApiProps) {
  return privateInstance.delete(`cart/product/${id}`, config);
}

export function addProductToCart({ data, id, config }: ProductParams) {
  return privateInstance.put(`cart/${id}`, data, config);
}

export function deleteProductFromCart({ id, config }: ApiProps) {
  return privateInstance.delete(`cart/${id}`, config);
}
