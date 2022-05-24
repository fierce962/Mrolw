import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../../models/Storage";
import { getWordsRangeDb } from "../../database/database";

import { controllerNotifications } from "../../models/ControllerNotifications";


export const getWords = createAsyncThunk(
    'learn/getWords',
    async () => {
        let parseWords = await getStorage('words');
        if(parseWords === null || parseWords.day !== new Date().getDate()){
            if(parseWords === null) parseWords = {};
            const maxId = parseWords.maxId === undefined ? 4 : parseWords.maxId; 
            let limit = 5;
            if(parseWords.learn !== undefined && parseWords.learn.length !== 0){
                parseWords.learn.forEach(learnWords => {
                    parseWords.list.push(learnWords);
                });
                limit += -parseWords.list.length;
            };
            if(limit !== 0){
                const newList = await getWordsRangeDb(maxId, limit);
                const olwList = parseWords.list === undefined ? [] : parseWords.list;
                parseWords = createWordsObject(olwList);
                newList.forEach(wordList =>{
                    parseWords.list.push(wordList);
                });
                parseWords.maxId = getMaxId(parseWords.list);
            }else{
                parseWords.day = new Date().getDate();
                parseWords.learn = [];
            }
        }
        await setStorage('words', parseWords);
        return parseWords;
    }
)

function getMaxId(learnList){
    const ids = [];
    learnList.forEach(learnWord => {
        ids.push(learnWord.id);
    })
    return Math.max(... ids) + 5;
}

export const setLearnWord = createAsyncThunk(
    'learn/setWord',
    async (index, thunkApi) => {
        let words = thunkApi.getState().learn.words;
        const list = words.list.filter((value, i) => i !== index);
        let learn = [... words.learn];
        learn.push(words.list[index]);
        if(list.length === 0){
            learn = CreateRamdonLearn(learn);
            try {
                const notificationData =  {... learn[0]}
                delete notificationData.id;
                await addNotification(notificationData);
            } catch (error) {
                console.log(error)
            }
        } 
        await setStorage('words', createWordsObject(list, learn, words.maxId));
        return {
            newList: list,
            newLearn: learn 
        }
    }
)

export const removeLearn = createAsyncThunk(
    'learn/remove',
    async () => {
        const words = await getStorage('words')
        words.learn.shift();
        await setStorage('words', words);
        if(words.learn.length !== 0){
            delete words.learn[0].id
            await addNotification(words.learn[0]);
        }
        return words;
    }
)

async function addNotification(data){
    await controllerNotifications.createNotification('Comienza la prueba', 
    'Ya puedes practicar lo que aprendiste', data, 180000);
    await setStorage('proxTestMode', new Date( new Date().getTime() + 180000 ));
}

function CreateRamdonLearn(learn){
    const newLearn = [];
    while(learn.length !== 0){
        position = parseInt(Math.random() * learn.length);
        let word = learn.splice(position, 1)
        newLearn.push(word[0])
    }
    return newLearn;
}

function createWordsObject(addList = [], addLearn = [], maxId = 0){
    return {
        day: new Date().getDate(),
        list: addList,
        learn: addLearn,
        maxId: maxId
    }
}

function getMode(state){
    if(state.words.list.length === 0 && state.words.learn.length !== 0){
        return 'testMode';
    }else if(state.words.list.length === 0 && state.words.learn.length === 0){
        return 'finishMode';
    }
    return undefined;
}

const learnSlice = createSlice({
    name: 'learn',
    initialState: {
        words: undefined,
        mode: ['learnMode'],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getWords.fulfilled, (state, action) => {
            state.words = action.payload;
            const mode = [getMode(state)];
            if(mode[0] !== undefined) state.mode = mode;
        }),
        builder.addCase(setLearnWord.fulfilled, (state, action) => {
            state.words.list = action.payload.newList;
            state.words.learn = action.payload.newLearn;
            const mode = [getMode(state)];
            if(mode[0] !== undefined) state.mode = mode;
        }),
        builder.addCase(removeLearn.fulfilled, (state, action) => {
            state.words = action.payload;
            const mode = [getMode(state)];
            if(mode[0] !== undefined) state.mode = mode;
        })
    }
})

export default learnSlice.reducer;



