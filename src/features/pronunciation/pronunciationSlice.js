import { createSlice } from "@reduxjs/toolkit";

const pronunciationSlice = createSlice({
    name: 'pronunciation',
    initialState: {
        words: {
            "english": "makes",
            "espanish": "hace",
            "pronunciation": "māks",
            "pronunciationSpanish": "meiks"
        },
        startRecord: false,
        noSpeech: false
    },
    reducers: {
        changeStartRecord(state) {
            state.startRecord = !state.startRecord;
        },
        ChangeNoSpeech(state, actions) {
            state.noSpeech = actions.payload;
        }
    }
});

export default pronunciationSlice.reducer;
export const { changeStartRecord, ChangeNoSpeech } = pronunciationSlice.actions;