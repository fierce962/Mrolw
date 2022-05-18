import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStorage } from "../../models/Storage";

export const getWords = createAsyncThunk(
    'getWords',
    async () => {
        const words = await getStorage('words');
        const parseWords = JSON.parse(words);
        if(parseWords === null){
            console.log('buscar en base de datos')
        }else if(parseWords.day !== new Date().getDate()){
            if(parseWords.list.length === 0){
                console.log('buscar en base de datos');
            }else {
                parseWords.learn.forEach(learnWords => {
                    parseWords.list.push(learnWords);
                });
            }
        }
        return parseWords;
    }
)

const learnSlice = createSlice({
    name: 'learn',
    initialState: {
        words: undefined,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getWords.fulfilled, (state, action) => {
            state.words = action.payload;
        })
    }
})

export default learnSlice.reducer;



