import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    currentGroup : '',
    isLoading : false,
    isError : false,
    currentGroupData : {}
};

export const fetchCurrentGroupData = createAsyncThunk(
    
    'group/fetchCurrentGroupData',

    async (group) => {
    
        const response = await axios.get(
            `http://localhost:8080/group?id=${group}`
        );

        //console.log("response: ", response);
        return response.data;
});

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
        })
    }
});

export default currentGroupSlice.reducer;

export const {setCurrentGroup}  = currentGroupSlice.actions;