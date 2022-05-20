import { createSlice } from "@reduxjs/toolkit";

const pronunciationSlice = createSlice({
    name: 'pronunciation',
    initialState: {
        words: undefined,
        startRecord: false,
        noSpeech: false
    },
    reducers: {
        loadWord(state, actions){
            state.words = actions.payload;
        },
        changeStartRecord(state) {
            state.startRecord = !state.startRecord;
        },
        ChangeNoSpeech(state, actions) {
            state.noSpeech = actions.payload;
        }
    }
});

export default pronunciationSlice.reducer;
export const { changeStartRecord, ChangeNoSpeech, loadWord } = pronunciationSlice.actions;