import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCategories as fetchCategories } from "../../../services/api/categoriesApi";
import type { CategoriesProps } from "../slices/categories/models";

export const getCategories = createAsyncThunk<CategoriesProps[], void>("categories/getCategories", async () => {
  const { data } = await fetchCategories();

  return data;
});
