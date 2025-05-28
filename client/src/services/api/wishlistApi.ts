import axiosInstance from "./axios";

export function getWishlist() {
  return axiosInstance.get("wishlist");
}

export function addProductToWishlist({ id }: { id: string }) {
  return axiosInstance.put(`wishlist/${id}`);
}

export function deleteProductFromWishlist({ id }: { id: string }) {
  return axiosInstance.delete(`wishlist/${id}`);
}
