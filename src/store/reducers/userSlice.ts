import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SetUserT {
    loggedIn: boolean;
    token: string | null;
}

interface User {
    loggedIn: boolean;
    token: string | null;
    fullName: string | null;
}

const initialState: User = {
    loggedIn: false,
    token: null,
    fullName: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<SetUserT>) => {
            state.loggedIn = action.payload.loggedIn;
            state.token = action.payload.token;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload
        },
        deleteUser: (state) => {
            state.loggedIn = false;
            state.token = null;
            state.fullName = null;
        }
    }
})

export const { setUser, setUserName, deleteUser } = userSlice.actions;
export default userSlice.reducer;