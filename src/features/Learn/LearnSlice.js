import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../../models/Storage";
import { getWordsDb } from "../../database/database";

export const getWords = createAsyncThunk(
    'learn/getWords',
    async () => {
        const words = await getStorage('words');
        let parseWords = JSON.parse(words);
        if(parseWords === null){
            parseWords = createWordsObject(await getWordsDb(4));
        }else if(parseWords.day !== new Date().getDate()){
            if(parseWords.list.length === 0){
                const maxid = getMaxId(parseWords.learn) + 5;
                parseWords = createWordsObject(await getWordsDb(maxid));
            }else {
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
        const learn = [... words.learn];
        learn.push(words.list[index]);
        await setStorage('words', createWordsObject(list, learn))
        return {
            newList: list,
            newLearn: learn 
        }
    }
)

function createWordsObject(addList, addLearn = []){
    return {
        day: new Date().getDate(),
        list: addList,
        learn: addLearn
    }
}

const learnSlice = createSlice({
    name: 'learn',
    initialState: {
        words: undefined,
        learnFishin: 'learnMode' | 'textMode',
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getWords.fulfilled, (state, action) => {
            state.words = action.payload;
        }),
        builder.addCase(setLearnWord.fulfilled, (state, action) => {
            state.words.list = action.payload.newList;
            state.words.learn = action.payload.newLearn;
        })
    }
})

export default learnSlice.reducer;



