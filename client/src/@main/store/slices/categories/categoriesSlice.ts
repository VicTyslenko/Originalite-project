import { getCategories } from "@main/store/actions/categoriesActions";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { CategoriesProps } from "./models";

type InitialProps = {
  data: CategoriesProps[];
};

const initialState: InitialProps = {
  data: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategories.fulfilled, (state, action: PayloadAction<CategoriesProps[]>) => {
      state.data = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
