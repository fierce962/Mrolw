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
        testEnd: false,
        startRecord: false,
    },
    reducers: {
        changeStartRecord(state) {
            state.startRecord = ! state.startRecord;
        },
        textEnd(state) {
            state.testEnd = true;
        }
    }
});

export default pronunciationSlice.reducer;
export const { changeStartRecord, textEnd } = pronunciationSlice.actions;