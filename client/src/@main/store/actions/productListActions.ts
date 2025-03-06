import { createAsyncThunk } from "@reduxjs/toolkit";

import { getProductsList as fetchProductList } from "../../../services/api/productsApi";
import type { ProductListParamsProps } from "../models";

export const getProductList = createAsyncThunk("productList/getProductList", async (params: ProductListParamsProps) => {
  const { data } = await fetchProductList(params);

  return data;
});
