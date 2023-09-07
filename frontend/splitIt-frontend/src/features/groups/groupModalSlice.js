import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {

    isModalOpen : false,
    isCreationLoading : false,
    isCreationFailed : false
    
};

export const createNewGroup = createAsyncThunk(
    '',

    async (data, thunkAPI) => {

        const {email, name} = data;

        const response = await axios.post(
            'http://localhost:8080/group',
            {
                "name" : name,
                "email" : email
            }
        );

        return response.data;
    }
);

const groupModalSlice = createSlice(

    {
        name : 'groupModal',
        initialState : initialState,

        reducers : {

            openModal : (state) => {
                state.isModalOpen = true;
            },

            closeModal : (state) => {
                state.isModalOpen = false;
            },


        },

        extraReducers : (builder) => {

            builder.addCase(createNewGroup.pending, (state, action) => {
                state.isCreationLoading = true;
                state.isCreationFailed = false;
            });

            builder.addCase(createNewGroup.fulfilled, (state, action) => {
                state.isCreationFailed = false;
                state.isCreationLoading = false;
            });

            builder.addCase(createNewGroup.rejected, (state, action) => {
                state.isCreationFailed = true;
                state.isCreationLoading = false;
            });

        }
    }
);

export const {openModal, closeModal} = groupModalSlice.actions;
export default groupModalSlice.reducer;