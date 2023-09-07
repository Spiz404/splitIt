import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import groupModalReducer from './features/groups/groupModalSlice';
const store = configureStore(
    {
        reducer : {
            user : userReducer,
            groupModal : groupModalReducer
        }
    }
);

export default store;