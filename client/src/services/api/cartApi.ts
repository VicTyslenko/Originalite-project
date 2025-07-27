import { type AxiosResponse } from "axios";
import type { CartProps } from "shared/models/cart.models";

import { publicInstance } from "./axios";
import privateInstance from "./axios";
import type { ProductParams } from "./models";

export function getCart(): Promise<AxiosResponse<CartProps>> {
  return publicInstance.get<CartProps>("cart");
}
export function deleteCart() {
  return privateInstance.delete(`cart`);
}
export function decreaseQuantity({ id }: { id: string }) {
  return privateInstance.delete(`cart/product/${id}`);
}

export function addProductToCart({ data, id }: ProductParams) {
  return privateInstance.put(`cart/${id}`, data);
}

export function deleteProductFromCart({ id }: { id: string }) {
  return privateInstance.delete(`cart/${id}`);
}
export type DiscountProps = {
  discountCode: string;
};
export function getDiscount(params: DiscountProps) {
  return publicInstance.post("/cart/discount", { ...params });
}
