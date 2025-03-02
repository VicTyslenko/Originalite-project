import { createAsyncThunk } from "@reduxjs/toolkit";

import { getColors as fetchColors } from "../../../services/api/colorsApi";
import type { ColorProps } from "../slices/color/models";

export const getColors = createAsyncThunk<ColorProps[], void>("colors/getColors", async () => {
  const { data } = await fetchColors();

  return data;
});
