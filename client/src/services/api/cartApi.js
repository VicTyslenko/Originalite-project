import axiosInstance from "./axios";

export function getCart(config) {
	return axiosInstance.get("cart", config);
}
export function deleteCart(config) {
	return axiosInstance.delete(`cart`, config);
}
export function decreaseQuantity(id, config) {
	return axiosInstance.delete(`cart/product/${id}`, config);
}

export function addProductToCart(id, data, config) {
	return axiosInstance.put(`cart/${id}`, data, config);
}

export function deleteProductFromCart(id, config) {
	return axiosInstance.delete(`cart/${id}`, config);
}
