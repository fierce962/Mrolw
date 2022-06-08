import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStorage } from "../../models/Storage";

export const calcTime = createAsyncThunk(
    'timet/calctime',
    async () => {
        const dateStorage = await getStorage('proxTestMode');
        console.log('date storage', dateStorage);
        if(dateStorage !== null){
            const goData = new Date(dateStorage);
            let calc = (goData.getTime() - new Date().getTime()) / 60000;
            let seconds = parseInt(((calc.toFixed(2).split('.')[1] / 99) * 60000));
            if(seconds === 0){
                console.log('seconds fue 0 se asigno 59000')
                seconds = 59000;
            } 
            calc = parseInt(calc);
            if(calc >= 10){
                calc = calc.toString();
            }else if(calc > 0){
                calc = `0${ calc }`;
            }else{
                calc = '00';
            }
            return [goData.toString(), calc, seconds];
        }
        return [`${ new Date() }`, '00', undefined];
    }
)


const timerCounter = createSlice({
    name: 'timer',
    initialState: {
        goalDate: undefined,
        timeRemaining: undefined,
        seconds: undefined
    },
    reducers: {
        restTime(state){
            state.seconds = 59000;
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
            console.log('action seconds', action.payload[2])
            state.seconds = action.payload[2];
        });
    }
});

export default timerCounter.reducer;
export const { restTime } = timerCounter.actions;