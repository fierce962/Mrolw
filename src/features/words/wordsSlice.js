import { createSlice } from "@reduxjs/toolkit";


const palabrasSlice = createSlice({
    name: 'words',
    initialState: {
        menuSelect: 0,
    },
    reducers: {
        setNewSelectMenu: (state, action) => {
            if(state.menuSelect !== action.payload){
                state.menuSelect = action.payload;
            }
        }
    }
});

export default palabrasSlice.reducer;
export const { setNewSelectMenu } = palabrasSlice.actions;
