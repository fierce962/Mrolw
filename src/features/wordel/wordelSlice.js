import { createSlice } from "@reduxjs/toolkit";

const wordelSlice = createSlice({
    name: 'wordel',
    initialState: {
        wordel: [],
        actualIndex: 0,
        seletIndex: undefined,
        attempts: [true],
        finish: [false],
        actualWord: ['']
    },
    reducers: {
        clearWordel: (state) => {
            state.wordel = [],
            state.actualIndex = 0,
            state.seletIndex = undefined,
            state.attempts = [true],
            state.finish = [false],
            state.actualWord = ['']
        },
        newAttempts: (state, action) => {
            let [valid, finish] = validNew(state.wordel[state.wordel.length - 1], action.payload);
            if(finish || state.wordel.length + 1 === 4){
                let message;
                if(finish){
                    message = 'Correcta';
                }else{
                    message = 'Fallaste';
                }
                state.finish = [true, message];
            }else{
                if(valid){
                    create(state, action)
                    state.attempts[state.attempts.length - 1] = false;
                    state.attempts.push(true);
                    state.actualWord = ['']
                }else{
                    state.wordel[state.wordel.length - 1][state.actualIndex + 1].active = true;
                }
            }
        },
        createWordel: (state, action) => {
            create(state, action);
        },
        setActualWorlde: (state, action) => {
            const text = action.payload.text;
            const key = action.payload.key;
            if(state.seletIndex === undefined){
                const newWordel = text.split('');
                let newWord = '';
                state.wordel[state.wordel.length - 1].forEach((position, i) => {
                    if(newWordel[i] !== undefined){
                        position.letters = newWordel[i];
                        newWord += newWordel[i];
                        state.actualIndex = i;
                    }else{
                        position.letters = '';
                    }
                    position.active = false;
                })
                state.actualWord = [newWord];
                if(state.wordel[state.wordel.length - 1][newWordel.length] !== undefined &&
                    state.wordel[state.wordel.length - 1][newWordel.length].letters === ''){
                    state.wordel[state.wordel.length - 1][newWordel.length].letters = ' ';
                    state.wordel[state.wordel.length - 1][newWordel.length].active = true;
                };
            } else {
                if(key !== 'Backspace'){
                    const changeWord = state.actualWord[0].split('');
                    changeWord[state.seletIndex] = text[text.length - 1];
                    state.actualWord = [changeWord.join('')];
                    state.wordel[state.wordel.length - 1][state.seletIndex].letters = text[text.length - 1];
                    state.wordel[state.wordel.length - 1][state.seletIndex].active = false;
                    if(state.wordel[state.wordel.length - 1][state.actualIndex + 1] !== undefined){
                        state.wordel[state.wordel.length - 1][state.actualIndex + 1].active = true;
                    }
                    state.seletIndex = undefined;
                }else{
                    state.wordel[state.wordel.length - 1][state.seletIndex].letters = ' ';
                }
            }
        },
        selectWordel(state, action){
            if(state.wordel[state.wordel.length - 1][state.actualIndex + 1] !== undefined){
                state.wordel[state.wordel.length - 1][state.actualIndex + 1].active = false;
            }
            state.wordel[state.wordel.length - 1][action.payload].active = true;
            state.seletIndex = action.payload;
        },
        blurWordelFocus(state){
            if(state.wordel[state.wordel.length - 1][state.actualIndex + 1] !== undefined){
                state.wordel[state.wordel.length - 1][state.actualIndex + 1].active = false;
            }
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
        }else if(element.letters.toLocaleLowerCase() === word[i].toLocaleLowerCase()){
            element.correct = 'green';
            countCorret += 1
        }else{
            element.correct = 'none';
        }
    });
    return [validCreate, countCorret === wordel.length];
}

export const { clearWordel, createWordel, setActualWorlde, selectWordel, newAttempts, blurWordelFocus } = wordelSlice.actions;
export default wordelSlice.reducer;