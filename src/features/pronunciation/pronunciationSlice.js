import { createSlice } from "@reduxjs/toolkit";

const pronunciationSlice = createSlice({
    name: 'pronunciation',
    initialState: {
        words: undefined,
        noSpeech: false
    },
    reducers: {
        loadWord(state, actions){
            state.words = actions.payload;
        },
        ChangeNoSpeech(state, actions) {
            state.noSpeech = actions.payload;
        }
    }
});

export default pronunciationSlice.reducer;
export const { ChangeNoSpeech, loadWord } = pronunciationSlice.actions;