import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getColors } from "../../actions/colorsActions";
import type { ColorProps, InitialStateProps } from "./models";

const initialState: InitialStateProps = {
  data: [],
};

export const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getColors.fulfilled, (state, action: PayloadAction<ColorProps[]>) => {
  
      state.data = action.payload;
    });
  },
});

export default colorsSlice.reducer;
