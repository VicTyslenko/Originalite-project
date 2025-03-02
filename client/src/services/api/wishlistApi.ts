import axiosInstance from "./axios";
import type { ApiProps } from "./models";

export function getWishlist({ config }: ApiProps) {
  return axiosInstance.get("wishlist", config);
}

export function addProductToWishlist({ id, config }: ApiProps) {
  return axiosInstance.put(`wishlist/${id}`, {}, config);
}

export function deleteProductFromWishlist({ id, config }: ApiProps) {
  return axiosInstance.delete(`wishlist/${id}`, config);
}
