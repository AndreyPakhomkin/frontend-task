import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    loggedIn: boolean,
    token: string | null
}

const initialState: User = {
    loggedIn: false,
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.loggedIn = action.payload.loggedIn;
            state.token = action.payload.token;
        }

    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;