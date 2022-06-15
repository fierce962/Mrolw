import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../../models/Storage";
import { getWordsRangeDb, setUserDataWords } from "../../database/database";

import { controllerNotifications } from "../../models/ControllerNotifications";


export const getWords = createAsyncThunk(
    'learn/getWords',
    async () => {
        let user = await getStorage('user');
        try {
            if(user.words === undefined || user.words.day !== new Date().getDate()){
                await controllerNotifications.removeNotification('notificationId');
                if(user.words === undefined) user.words = {};
                const maxId = user.words.maxId === undefined ? 4 : user.words.maxId; 
                let limit = 5;
                if(user.words.learn !== undefined && user.words.learn.length !== 0){
                    user.words.learn.forEach(learnWords => {
                        user.words.list.push(learnWords);
                    });
                };
                if(user.words.learn !== undefined){
                    limit += -user.words.list.length;
                }
                if(limit !== 0){
                    const newList = await getWordsRangeDb(maxId, limit);
                    const olwList = user.words.list === undefined ? [] : user.words.list;
                    user.words = createWordsObject(olwList);
                    newList.forEach(wordList =>{
                        user.words.list.push(wordList);
                    });
                    user.words.maxId = getMaxId(user.words.list);
                }else{
                    user.words.day = new Date().getDate();
                    user.words.learn = [];
                }
            }
        } catch (error) {
            console.log('error getwords', error)
        }
        await setStorage('user', user);
        return user.words;
    }
)

export const searchWords = createAsyncThunk(
    'learn/searchNewWords',
    async () => {
        try {
            let user = await getStorage('user');
            user.words.list = await getWordsRangeDb(user.words.maxId, 5);
            user.words.maxId = getMaxId(user.words.list);
            await setStorage('user', user);
            return user.words;
        } catch (error) {
            ('seachWords', error)
        }
    }
);

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
        let user = await getStorage('user');
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
        user.words = createWordsObject(list, learn, words.maxId);
        await setStorage('user', user);
        return {
            newList: list,
            newLearn: learn 
        }
    }
)

export const removeLearn = createAsyncThunk(
    'learn/remove',
    async () => {
        try {
            const user = await getStorage('user')
            user.words.learn.shift();
            await setUserDataWords({ ... user });
            if(user.words.learn.length !== 0){
                delete user.words.learn[0].id
                await addNotification(user.words.learn[0]);
            }
            await setStorage('user', user);
            return user.words;
        } catch (error) {
            console.log('error remove learn', error)
        }
    }
)

export const errorLearn = createAsyncThunk(
    'learn/ErrorResults',
    async () => {
        try {
            const user = await getStorage('user')
            const remove = user.words.learn.shift();
            user.words.learn.push(remove);
            if(user.words.learn.length !== 0){
                delete user.words.learn[0].id
                await addNotification(user.words.learn[0]);
            }
            await setStorage('user', user);
            return user.words;
        } catch (error) {
            console.log('learn/errorResults', error)
        }
    }
)

async function addNotification(data){
    await controllerNotifications.createNotification('Comienza la prueba', 
    'Ya puedes practicar lo que aprendiste', data, 60000);
    await setStorage('proxTestMode', new Date( new Date().getTime() + 60000 ));
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
        clearLearn(state){
            state.words = undefined;
            state.mode = ['learnMode'];
        },
        refreshHome(state){
            state.mode = ['learnMode'];
        }
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
        }),
        builder.addCase(searchWords.fulfilled, (state, action) => {
            state.words = action.payload;
            state.mode = ['learnMode'];
        }),
        builder.addCase(errorLearn.fulfilled, (state, action) => {
            state.words = action.payload;
            state.mode = ['testMode'];
        })
    }
})

export default learnSlice.reducer;
export const { refreshHome, clearLearn } = learnSlice.actions;


