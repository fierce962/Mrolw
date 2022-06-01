import { createSlice } from "@reduxjs/toolkit";

const materialSlice = createSlice({
    name: 'materialInput',
    initialState: {
        inputs: [],
    },
    reducers: {
        createInput(state, action){
            state.inputs = [];
            action.payload.forEach(textValue => {
                state.inputs.push({
                    textHolder: textValue,
                    focus: false,
                    value: ''
                })
            });
        },
        setFocus(state, action){
            state.inputs[action.payload].focus = !state.inputs[action.payload].focus
        },
        setValueInputs(state, action){
            if(action.payload.inputValue !== undefined){
                state.inputs[action.payload.index].value = action.payload.inputValue; 
            }
            if(action.payload.valid !== undefined){
                state.inputs[action.payload.index].valid = action.payload.valid;
            } 
        }
    }
})

export default materialSlice.reducer;
export const { createInput, setFocus, setValueInputs } = materialSlice.actions;