import axiosInstance from "./axios";

export function getCategories() {
	return axiosInstance.get('/catalog');
};
