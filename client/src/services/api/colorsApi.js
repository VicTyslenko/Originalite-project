import axiosInstance from "./axios";

export function getColors() {
	return axiosInstance.get('colors');
};
