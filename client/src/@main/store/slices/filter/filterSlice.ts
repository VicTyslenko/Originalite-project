import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { FiltersProps } from "./models";

const initialState: FiltersProps = {
  minPrice: null,
  maxPrice: null,
  colors: [],
  categories: null,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FiltersProps>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setFilters } = filterSlice.actions;

export default filterSlice.reducer;
