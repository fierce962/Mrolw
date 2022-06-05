import { createSlice } from "@reduxjs/toolkit";


const generalMessageFloating = createSlice({
    name: 'generalMessage',
    initialState: {
        render: false,
        menssage: ''
    },
    reducers: {
        setState(state, action){
            state.render = action.payload.render;
            if(action.payload.menssage !== undefined){
                state.menssage = action.payload.menssage;
            }
        }
    }
})

export default generalMessageFloating.reducer;
export const { setState } = generalMessageFloating.actions;