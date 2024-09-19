import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Modal {
  id: string;
  content: React.ReactNode;
}

interface ModalState {
  modals: Modal[];
}

const initialState: ModalState = {
  modals: [],
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Modal>) => {
      state.modals.push(action.payload);
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter(modal => modal.id !== action.payload);
    },
    closeAllModals: (state) => {
      state.modals = [];
    },
  },
});

export const { openModal, closeModal, closeAllModals } = modalSlice.actions;

export default modalSlice.reducer;
