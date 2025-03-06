import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Error {
    errorStatus: boolean,
    errorMessage: string | null
}

const initialState: Error = {
    errorStatus: false,
    errorMessage: null
}

interface ErrorPayload {
    errorStatus: boolean,
    errorMessage: string | null
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<ErrorPayload>) => {
            state.errorStatus = action.payload.errorStatus;
            state.errorMessage = action.payload.errorMessage;
        }
    }
})

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;