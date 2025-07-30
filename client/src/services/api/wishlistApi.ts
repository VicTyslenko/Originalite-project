import axiosInstance from "./axios";
import privateInstance from "./axios";

export function getWishlist() {
  return privateInstance.get("wishlist");
}

export function addProductToWishlist({ id }: { id: string }) {
  return axiosInstance.put(`wishlist/${id}`);
}

export function deleteProductFromWishlist({ id }: { id: string }) {
  return axiosInstance.delete(`wishlist/${id}`);
}
