import { createSlice } from "@reduxjs/toolkit";

const palabrasSlice = createSlice({
    name: 'words',
    initialState: {
        menuSelect: 0,
        wordsSelect: [],
        list: [],
        end: false,
    },
    reducers: {
        setNewSelectMenu: (state, action) => {
            if(state.menuSelect !== action.payload){
                state.menuSelect = action.payload;
            }
        },
        clearSlice: (state) => {
            state.wordsSelect = [];
            state.list = [];
            state.end = false;
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
        },
        setEnd: (state, action) => {
            state.end = action.payload;
        }
    }
});

export default palabrasSlice.reducer;
export const { setNewSelectMenu, clearSlice, setLearnedWords, changeOpenWordByIndex, setEnd } = palabrasSlice.actions;
