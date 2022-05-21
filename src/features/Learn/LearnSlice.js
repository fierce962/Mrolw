import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../../models/Storage";
import { getWordsRangeDb } from "../../database/database";

import { controllerNotifications } from "../../models/ControllerNotifications";


export const getWords = createAsyncThunk(
    'learn/getWords',
    async () => {
        const words = await getStorage('words');
        let parseWords = JSON.parse(words);
        if(parseWords === null){
            parseWords = createWordsObject(await getWordsRangeDb(4));
        }else if(parseWords.day !== new Date().getDate()){
            if(parseWords.list.length === 0){
                const maxid = getMaxId(parseWords.learn) + 5;
                parseWords = createWordsObject(await getWordsRangeDb(maxid));
            }else{
                parseWords.learn.forEach(learnWords => {
                    parseWords.list.push(learnWords);
                });
                parseWords = createWordsObject(parseWords.list);
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
    return Math.max(... ids)
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
        await setStorage('words', createWordsObject(list, learn));
        return {
            newList: list,
            newLearn: learn 
        }
    }
)

export const removeLearn = createAsyncThunk(
    'learn/remove',
    async () => {
        const words = JSON.parse(await getStorage('words'));
        words.learn.shift();
        await setStorage('words', words);
        console.log(words.learn.length)
        delete words.learn[0].id
        await addNotification(words.learn[0]);
    }
)

async function addNotification(data){
    await controllerNotifications.createNotification('Comienza la prueba', 
    'Ya puedes practicar lo que aprendiste', data, 60000);
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

function createWordsObject(addList, addLearn = []){
    return {
        day: new Date().getDate(),
        list: addList,
        learn: addLearn
    }
}

function getMode(state){
    if(state.words.list.length === 0 && state.words.learn.length !== 0){
        return 'testMode';
    }
    return undefined;
}

const learnSlice = createSlice({
    name: 'learn',
    initialState: {
        words: undefined,
        mode: 'learnMode',
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getWords.fulfilled, (state, action) => {
            state.words = action.payload;
            const mode = getMode(state)
            if(mode !== undefined) state.mode = mode;
        }),
        builder.addCase(setLearnWord.fulfilled, (state, action) => {
            state.words.list = action.payload.newList;
            state.words.learn = action.payload.newLearn;
            const mode = getMode(state)
            if(mode !== undefined) state.mode = mode;
        }),
        builder.addCase(removeLearn.fulfilled, () => {
            console.log('resolve')
        })
    }
})

export default learnSlice.reducer;



