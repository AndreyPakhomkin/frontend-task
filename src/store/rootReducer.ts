import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import errorReducer from './reducers/errorSlice';
import infoReducer from './reducers/infoSlice';

const rootReducer = combineReducers({
    user: userReducer,
    error: errorReducer,
    information: infoReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>; 