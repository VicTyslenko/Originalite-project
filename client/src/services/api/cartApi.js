import axiosInstance from './axios';

export function getCart(config) {
	return axiosInstance.get('cart', config);
}
export function deleteCart(id, config) {
	return axiosInstance.delete(`cart/`, config);
}

export function addProductToCart(id, data, config) {
	return axiosInstance.put(`cart/${id}`, data, config);
}

export function deleteProductFromCart(id, config) {
	return axiosInstance.delete(`cart/${id}`, config);
}
