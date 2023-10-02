import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open : false
}

const newOperationModalSlice = createSlice(
    {
        name : 'newOperationModal',
        initialState,
        reducers : {
            openNewOperationModal(state) {
                state.open = false;
            },
            closeNewOperationModal(state) {
                state.open = false;
            }

        }
    }
);

export default newOperationModalSlice.reducer;
export const { openNewOperationModal, closeNewOperationModal } = newOperationModalSlice.actions;
