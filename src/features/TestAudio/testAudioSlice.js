import { createSlice } from "@reduxjs/toolkit";


const testAudioSlice = createSlice({
    name: 'testAudio',
    initialState: {
        words: [],
        listInputs: false,
        renderMessage: [],
        evaluateInputs: []
    },
    reducers: {
        assingwords(state, action){
            state.words = action.payload;
        },
        setRenderInput(state, action){
            state.listInputs = action.payload;
        },
        setRenderMessage(state, action){
            if(state.evaluateInputs[action.payload.index] === undefined){
                state.evaluateInputs.push(false);
                state.renderMessage.push(false);
            };
            if(action.evaluateInputs !== undefined){
                state.evaluateInputs[action.payload.index] = action.evaluateInputs;
                state.renderMessage[action.payload.index] = true;
            }
        }
    },
});

export default testAudioSlice.reducer;
export const { assingwords, setRenderInput, setRenderMessage } = testAudioSlice.actions;