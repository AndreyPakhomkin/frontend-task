import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import errorReducer from './reducers/errorSlice';

const rootReducer = combineReducers({
    user: userReducer,
    error: errorReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>; 