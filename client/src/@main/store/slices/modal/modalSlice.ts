import { createSlice } from "@reduxjs/toolkit";

const initialState: { modal: boolean } = {
  modal: false,
};

const modalReducer = createSlice({
  name: "modal",

  initialState,

  reducers: {
    toggleModal(state) {
      state.modal = !state.modal;
    },

    openModal(state) {
      state.modal = true;
    },
    closeModal(state) {
      state.modal = false;
    },
  },
});

export const { closeModal, toggleModal, openModal } = modalReducer.actions;
export default modalReducer.reducer;
