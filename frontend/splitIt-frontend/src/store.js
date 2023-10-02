import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import groupModalReducer from './features/groups/groupModalSlice';
import currentGroupReducer from './features/groups/currentGroupSlice';
import registrationSlice from './features/registration/registrationSlice';
import newOperationModalReducer from './features/operations/newOperationModalSlice';
const store = configureStore(
    {
        reducer : {
            user : userReducer,
            groupModal : groupModalReducer,
            currentGroup : currentGroupReducer,
            registration : registrationSlice,
            newOperationModal : newOperationModalReducer
        }
    }
);

export default store;
