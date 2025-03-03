import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ProductData } from "shared/models/products.models";

import { getProductById as fetchProductById } from "../../../services/api/productsApi";

export const getProduct = createAsyncThunk<ProductData, string>("product/getProductById", async itemNo => {
  const { data } = await fetchProductById(itemNo);
  console.log("product", data);
  return data;
});
