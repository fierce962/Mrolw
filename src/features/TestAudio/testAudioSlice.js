import { createSlice } from "@reduxjs/toolkit";


const testAudioSlice = createSlice({
    name: 'testAudio',
    initialState: {
        words: [],
        listInputs: false,
        renderMessage: [],
        evaluateInputs: [],
        renderResults: 'inputs'
    },
    reducers: {
        clearTestAudio(state){
            state.words = [];
            state.listInputs = false;
            state.renderMessage = [];
            state.evaluateInputs = [];
            state.renderResults = 'inputs';
        },
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
            if(action.payload.text !== ''){
                state.evaluateInputs[action.payload.index] = action.payload.text.toLowerCase() === state.words[action.payload.index].english.toLowerCase();
                state.renderMessage[action.payload.index] = true;
            };
        },
        setRenderResultsOrInputs(state, action){
            state.renderResults = action.payload;
        }
    },
});

export default testAudioSlice.reducer;
export const { assingwords, setRenderInput, setRenderMessage, setRenderResultsOrInputs, clearTestAudio } = testAudioSlice.actions;