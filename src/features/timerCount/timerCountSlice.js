import { createSlice } from "@reduxjs/toolkit";

const timerCounter = createSlice({
    name: 'timer',
    initialState: {
        goalDate: '2022-05-24T11:56:28.312Z',
        timeRemaining: undefined
    },
    reducers: {
        calcTime(state){
            console.log('calctime')
            let actualDate = new Date();
            state.timeRemaining = parseInt((new Date(state.goalDate).getTime() - actualDate.getTime()) / 60000).toString();
        },
        restTime(state){
            if(parseInt(state.timeRemaining) - 1 >= 10){
                state.timeRemaining = (parseInt(state.timeRemaining) - 1).toString();
            }else{
                state.timeRemaining = `0${ parseInt(state.timeRemaining) - 1 }`;
            }
        }
    }
});

export default timerCounter.reducer;
export const { calcTime, restTime } = timerCounter.actions;