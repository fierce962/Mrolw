import { createSlice } from "@reduxjs/toolkit";


const generalMessageFloating = createSlice({
    name: 'generalMessage',
    initialState: {
        render: true
    },
    reducers: {
        setRender(state, action){
            state.render = action.payload;
        }
    }
})

export default generalMessageFloating.reducer;
export const { setRender } = generalMessageFloating.actions;