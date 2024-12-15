import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: null,
	modal: false,
};

const modalReducer = createSlice({
	name: "modal",
	initialState,

	reducers: {
		setModalData(state, action) {
			state.modal = action.payload;
		},

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

export const { setModalData, closeModal, toggleModal, openModal } = modalReducer.actions;
export default modalReducer.reducer;
