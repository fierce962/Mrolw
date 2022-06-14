import { createSlice } from "@reduxjs/toolkit";

const FloatingButtonSlice = createSlice({
    name: 'floatingBtn',
    initialState: {
        parameters: {
            view: false,
            title: ''
        }
    },
    reducers: {
        setParameters(state, action){
            state.parameters.view = action.payload.view;
            state.parameters.title = action.payload.title;
        }
    }
});

export default FloatingButtonSlice.reducer;
export const { setParameters } = FloatingButtonSlice.actions;