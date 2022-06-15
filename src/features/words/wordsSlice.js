import { createSlice } from "@reduxjs/toolkit";


const palabrasSlice = createSlice({
    name: 'words',
    initialState: {
        menuSelect: 0,
        wordsLearned: [],
        wordsForLearned: [],
        openOrClose: []
    },
    reducers: {
        setNewSelectMenu: (state, action) => {
            if(state.menuSelect !== action.payload){
                state.menuSelect = action.payload;
            }
        },
        setLearnedWords: (state, action) => {
            console.log(action.payload)
            state.wordsLearned = action.payload;
        }
    }
});

export default palabrasSlice.reducer;
export const { setNewSelectMenu, setLearnedWords } = palabrasSlice.actions;
