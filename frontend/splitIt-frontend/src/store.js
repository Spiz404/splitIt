import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import groupModalReducer from './features/groups/groupModalSlice';
import currentGroupReducer from './features/groups/currentGroupSlice';

const store = configureStore(
    {
        reducer : {
            user : userReducer,
            groupModal : groupModalReducer,
            currentGroup : currentGroupReducer,
        }
    }
);

export default store;