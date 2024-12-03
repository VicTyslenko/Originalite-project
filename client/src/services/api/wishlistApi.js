import axiosInstance from "./axios";

export function getWishlist(config) {
	return axiosInstance.get('wishlist', config);
};

export function addProductToWishlist(id, config) {
	return axiosInstance.put(`wishlist/${id}`, null, config);
};

export function deleteProductFromWishlist(id, config) {
	return axiosInstance.delete(`wishlist/${id}`, config);
};
