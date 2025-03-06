import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Quote {
    author: string | null,
    quote: string | null;
}

interface Info {
    info: string | null;
    quote: Quote;
}

const initialState: Info = {
    info: null,
    quote: {
        author: null,
        quote: null
    }
}

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<string>) => {
            state.info = action.payload
        },
        setQuote: (state, action: PayloadAction<Quote>) => {
            state.quote.quote = action.payload.quote;
            state.quote.author = action.payload.author;
        },
        deleteQuote: (state) => {
            state.quote = {
                author: null,
                quote: null
            };
        }
    }
})

export const { setInfo, setQuote, deleteQuote } = infoSlice.actions;
export default infoSlice.reducer;