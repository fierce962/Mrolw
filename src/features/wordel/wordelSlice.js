import { createSlice } from "@reduxjs/toolkit";

const wordelSlice = createSlice({
    name: 'wordel',
    initialState: {
        wordel: [],
        actualIndex: 0,
        seletIndex: undefined,
        attempts: [true],
        finish: [false]
    },
    reducers: {
        newAttempts: (state, action) => {
            let [valid, finish] = validNew(state.wordel[state.wordel.length - 1], action.payload);
            if(finish || state.wordel.length + 1 === 4){
                let message;
                if(finish){
                    message = 'Correcta';
                }else{
                    resIncorrect(state.wordel[state.wordel.length - 1], action.payload);
                    message = 'Fallaste';
                }
                state.finish = [true, message];
            }else{
                if(valid){
                    create(state, action)
                    state.attempts[state.attempts.length - 1] = false;
                    state.attempts.push(true);
                }else{
                    state.wordel[state.wordel.length - 1][state.actualIndex].active = true;
                }
            }
        },
        createWordel: (state, action) => {
            create(state, action)
        },
        setActualWorlde: (state, action) => {
            if(action.payload === 'Backspace' || 
            (action.payload.toLowerCase().charCodeAt(0) >= 97 
            && action.payload.toLowerCase().charCodeAt(0) <= 122) ){
                const sum = action.payload === 'Backspace' ? -1 : 1;
                const index = state.seletIndex === undefined ? state.actualIndex : state.seletIndex;
                const actualValue = state.wordel[state.wordel.length - 1][index].letters;
                const setValue = getWordelValue(action.payload, actualValue, state.actualIndex, state.seletIndex);
    
                setWordel(state.wordel[state.wordel.length - 1][index], setValue);
    
                if((state.actualIndex + sum) > -1 && 
                (state.actualIndex + sum) < state.wordel[state.wordel.length - 1].length
                && actualValue === ' ' && state.seletIndex === undefined){
                    state.actualIndex += sum;
                    setWordel(state.wordel[state.wordel.length - 1][state.actualIndex], ' ');
                }
    
                if(state.seletIndex !== undefined && state.wordel[state.wordel.length - 1][index].letters !== ' '){
                    state.seletIndex = undefined;
                    state.wordel[state.wordel.length - 1][state.actualIndex].active = true;
                }
            }
        },
        selectWordel(state, action){
            if(state.actualIndex === action.payload){
                state.wordel[state.wordel.length - 1][state.actualIndex].active = true;
                if(state.seletIndex !== undefined){
                    state.wordel[state.wordel.length - 1][state.seletIndex].active = false;
                    state.seletIndex = undefined
                }
            }else if(state.actualIndex !== action.payload){
                state.wordel[state.wordel.length - 1][state.actualIndex].active = false;
                state.wordel[state.wordel.length - 1][action.payload].active = true;
                state.seletIndex = action.payload;
            }
        },
        blurWordelFocus(state){
            state.wordel[state.wordel.length - 1][state.actualIndex].active = false;
        }
    }
});

function create(state, action){
    state.wordel.push(
        action.payload.map((element, i) => {
            return {
                id: `${i}`,
                letters: i === 0 ? ' ' : '',
                active: i === 0 ? true : false
            }
        })
    );
    state.actualIndex = 0;
}

function setWordel(wordel, setValue){
    wordel.letters = setValue;
    wordel.active = setValue === ' ' ? true : false;
}

function getWordelValue(letter, actualValue, index, select){
    if(letter !== 'Backspace'){
        return letter.toLowerCase();
    }
    if(actualValue === ' ' && index !== 0 && select === undefined){
        return ''
    }else{
        return ' '
    }
}

function validNew(wordel, word){
    let countCorret = 0;
    let validCreate = !wordel.some((element, i) => {
        element.active = false;
        if(element.letters === '' || element.letters === ' '){
            return true
        }else if(element.letters === word[i]){
            element.correct = 'green';
            countCorret += 1
        }else{
            element.correct = 'none';
        }
    });
    return [validCreate, countCorret === wordel.length];
}

function resIncorrect(wordel, word){
    wordel.forEach((element, i) => {
        element.letters = word[i];
        element.correct = 'green';
    });
}

export const { createWordel, setActualWorlde, selectWordel, newAttempts, blurWordelFocus } = wordelSlice.actions;
export default wordelSlice.reducer;