import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import groupModalReducer from './features/groups/groupModalSlice';
import currentGroupReducer from './features/groups/currentGroupSlice';
import registrationSlice from './features/registration/registrationSlice';

const store = configureStore(
    {
        reducer : {
            user : userReducer,
            groupModal : groupModalReducer,
            currentGroup : currentGroupReducer,
            registration : registrationSlice,
        }
    }
);

export default store;
