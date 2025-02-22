import { getCategories } from "@main/store/actions/categoriesActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
