import { createSlice } from "@reduxjs/toolkit";

const palabrasSlice = createSlice({
    name: 'words',
    initialState: {
        menuSelect: 0,
        wordsSelect: [],
        list: []
    },
    reducers: {
        setNewSelectMenu: (state, action) => {
            if(state.menuSelect !== action.payload){
                state.menuSelect = action.payload;
            }
        },
        setLearnedWords: (state, action) => {
            action.payload.forEach(word => {
                word.open = false;
                state.list.push('add');
                state.wordsSelect.push(word);
            });
        },
        changeOpenWordByIndex: (state, action) => {
            state.wordsSelect[action.payload].open = !state.wordsSelect[action.payload].open;
        }
    }
});

export default palabrasSlice.reducer;
export const { setNewSelectMenu, setLearnedWords, changeOpenWordByIndex } = palabrasSlice.actions;
