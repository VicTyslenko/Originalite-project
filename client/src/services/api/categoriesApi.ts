import type { CategoriesProps } from "@main/store/slices/categories/models";
import { type AxiosResponse } from "axios";

import axiosInstance from "./axios";

export function getCategories(): Promise<AxiosResponse<CategoriesProps[]>> {
  return axiosInstance.get<CategoriesProps[]>("/catalog");
}
