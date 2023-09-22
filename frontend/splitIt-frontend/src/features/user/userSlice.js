import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLogged : false,
    username : null,
    isLoadingGroupFetch : false,
    isLoadingGroupFetchError : false,
    groups : []
};

export const fetchUserGroups = createAsyncThunk(
    'user/fetchUserGroups',
    async (email, thunkAPI) => {
        const response = await axios.get
        (`http://localhost:8080/user/userGroups?email=${email}`,
        {withCredentials : true});
        return response.data;
    }
);

const userSlice = createSlice(
    
    {
        name : 'user',
        initialState : initialState,

        reducers : {

            login : (state, action) => {
                state.isLogged = true;
                state.username = action.payload.username;
                localStorage.setItem('user', action.payload.username);
            },

            logout : async (state) => {
                
                try {
                    const response = await axios.post(
                        'http://localhost:8080/logout', 
                        {},
                        {withCredentials : true});
                    
                    console.log(response);
                    console.log(response.headers);
                    console.log(response.headers['Set-Cookie'])
                }
                catch(error) {
                    console.log(error);
                }

                localStorage.clear();
                
                state.isLogged = false;
                state.username = null;
            },

            
        },
        extraReducers : (builder) => {

            builder.addCase(fetchUserGroups.pending, (state, action) => {
                state.isLoadingGroupFetch = true;
                state.isLoadingGroupFetchError = false;
            });

            builder.addCase(fetchUserGroups.fulfilled, (state, action) => {
                state.isLoadingGroupFetch = false;
                state.isLoadingGroupFetchError = false;
                state.groups = action.payload;
            });

            builder.addCase(fetchUserGroups.rejected, (state, action) => {
                state.isLoadingGroupFetch = false;
                state.isLoadingGroupFetchError = true;
                
            });

        }
    }
);

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;