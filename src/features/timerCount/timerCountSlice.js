import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStorage } from "../../models/Storage";

export const calcTime = createAsyncThunk(
    'timet/calctime',
    async () => {
        const storageDate = new Date(await getStorage('proxTestMode'));
        let calc = (storageDate.getTime() - new Date().getTime()) / 60000;
        calc = parseInt(calc);
        if(calc >= 10){
            calc = calc.toString();
        }else if(calc > 0){
            calc = `0${ calc }`;
        }
        if(calc <= 0) calc = '00';
        return [storageDate.toString(), calc]
    }
)


const timerCounter = createSlice({
    name: 'timer',
    initialState: {
        goalDate: undefined,
        timeRemaining: undefined
    },
    reducers: {
        restTime(state){
            if(parseInt(state.timeRemaining) - 1 >= 10){
                state.timeRemaining = (parseInt(state.timeRemaining) - 1).toString();
            }else{
                state.timeRemaining = `0${ parseInt(state.timeRemaining) - 1 }`;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(calcTime.fulfilled, (state, action) => {
            state.goalDate = action.payload[0];
            state.timeRemaining = action.payload[1];
        });
    }
});

export default timerCounter.reducer;
export const { restTime } = timerCounter.actions;