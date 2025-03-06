import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    loggedIn: boolean,
    email: string | null,
    password: string | null,
    token: string | null
}

const initialState: User = {
    loggedIn: false,
    email: null,
    password: null,
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.loggedIn = action.payload.loggedIn;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.token = action.payload.token;
        }

    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;