import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../../models/Storage";
import { getWordsDb } from "../../database/database";

const remplaceDatabase = [{
    "english": "declarative",
    "espanish": "declarativo",
    "pronunciation": "dəklerədiv",
    "pronunciationSpanish": "dəklerədiv"
  },
  {
    "english": "react",
    "espanish": "reaccionar",
    "pronunciation": "rēakt",
    "pronunciationSpanish": "riakt"
  },
  {
    "english": "makes",
    "espanish": "hace",
    "pronunciation": "māk",
    "pronunciationSpanish": "meik"
  },
  {
    "english": "it",
    "espanish": "eso",
    "pronunciation": "it",
    "pronunciationSpanish": "it"
  },
  {
    "english": "painless",
    "espanish": "sin dolor",
    "pronunciation": "pānləs",
    "pronunciationSpanish": "peinləs"
  }]

export const getWords = createAsyncThunk(
    'learn/getWords',
    async () => {
        const words = await getStorage('words');
        let parseWords = JSON.parse(words);
        if(parseWords === null){
            parseWords = createWordsObject(remplaceDatabase);
            await setStorage('words', parseWords);
        }else if(parseWords.day !== new Date().getDate()){
            if(parseWords.list.length === 0){
                console.log('buscar en base de datos');
            }else {
                parseWords.learn.forEach(learnWords => {
                    parseWords.list.push(learnWords);
                });
            }
        }
        return parseWords;
    }
)

function createWordsObject(addList, addLearn = []){
    return {
        day: new Date().getDate(),
        list: addList,
        learn: addLearn
    }
}

export const setLearnWord = createAsyncThunk(
    'learn/setWord',
    async (index, thunkApi) => {
        let words = thunkApi.getState().learn.words;
        const list = words.list.filter((value, i) => i !== index);
        const learn = [... words.learn];
        learn.push(words.list[index]);
        console.log('hola')
        await setStorage('words', createWordsObject(list, learn))
        return {
            newList: list,
            newLearn: learn 
        }
    }
)

const learnSlice = createSlice({
    name: 'learn',
    initialState: {
        words: undefined,
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



