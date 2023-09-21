import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    currentGroup : '',
    isLoading : false,
    isError : false,
    newOperationLoading : false,
    newOperationError : false,
    currentGroupData : {}
};

export const fetchCurrentGroupData = createAsyncThunk(
    
    'group/fetchCurrentGroupData',

    async (group) => {
    
        const response = await axios.get(
            `http://localhost:8080/group?id=${group}`
        );

        return response.data;
});

export const addNewOperation = createAsyncThunk(
    'group/addNewOperation',
    async (operation) => {
        console.log('operation request', operation);
        const response = await axios.post(
            'http://localhost:8080/group/handleOperations',
            {operation : operation}
        );

        return response;
    }
);

const currentGroupSlice = createSlice({
    name : 'currentGroup',
    initialState,

    reducers : {
        setCurrentGroup : (state, action) => {
            state.currentGroup = action.payload;
        }
    },

    extraReducers : (builder) => {

        builder.addCase(fetchCurrentGroupData.pending, (state, action) => {
            // console.log("pending");
            state.isLoading = true;
            state.isError = false;
        }),

        builder.addCase(fetchCurrentGroupData.fulfilled, (state, action) => {
            // console.log("fulfilled", action);
            state.isLoading = false;
            state.isError = false;
            state.currentGroupData = action.payload;
        }),

        builder.addCase(fetchCurrentGroupData.rejected, (state, action) => {
            console.log("rejected");
            state.isLoading = false;
            state.isError = true;
        }),

        builder.addCase(addNewOperation.pending, (state, action) => {
            state.newOperationLoading = true;
            state.newOperationError = false;
        }),

        builder.addCase(addNewOperation.fulfilled, (state, action) => {
            state.newOperationLoading = false;
            state.newOperationError = false;
        }),

        builder.addCase(addNewOperation.rejected, (state, action) => {
            state.newOperationLoading = false;
            state.newOperationError = true;
        })

    } 
});

export default currentGroupSlice.reducer;

export const {setCurrentGroup}  = currentGroupSlice.actions;