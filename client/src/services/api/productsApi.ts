import type { ProductListParamsProps } from "@main/store/models";

import axiosInstance from "./axios";

export function getProductsList(params: ProductListParamsProps) {
  return axiosInstance.get("/products/filter", {
    params,
  });
}

export function getProductById(itemNo: string) {
  return axiosInstance.get(`/products/${itemNo}`);
}
