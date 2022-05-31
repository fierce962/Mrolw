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
                    text: textValue,
                    focus: false,
                    value: ''
                })
            });
        },
        setFocus(state, action){
            state.inputs[action.payload].focus = !state.inputs[action.payload].focus
        },
        setValueInputs(state, action){
            state.inputs[action.payload.index].value = action.payload.inputValue; 
        }
    }
})

export default materialSlice.reducer;
export const { createInput, setFocus, setValueInputs } = materialSlice.actions;