import { createSlice } from "@reduxjs/toolkit";

const timerCounter = createSlice({
    name: 'timer',
    initialState: {
        goalDate: '2022-05-22T04:50:25.700Z',
        timeRemaining: undefined
    },
    reducers: {
        calcTime(state){
            console.log('calctime')
            let actualDate = new Date();
            state.timeRemaining = parseInt((new Date(state.goalDate).getTime() - actualDate.getTime()) / 60000)
        }
    }
});

export default timerCounter.reducer;
export const { calcTime } = timerCounter.actions;