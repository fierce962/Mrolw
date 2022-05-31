import { configureStore } from '@reduxjs/toolkit';
import wordelSlice from '../features/wordel/wordelSlice';
import pronunciationSlice from '../features/pronunciation/pronunciationSlice';
import modalSlice from '../features/modal/modalSlice';
import floatingButtonSlice from '../features/FloatingButton/floatingButtonSlice';
import learnSlice from '../features/Learn/LearnSlice';
import timerCountSlice from '../features/timerCount/timerCountSlice';
import materialInputSlice from '../features/MaterialInput/materialInputSlice';

export const store = configureStore({
    reducer: {
        wordel: wordelSlice,
        pronunciation: pronunciationSlice,
        modal: modalSlice,
        floatingBtn: floatingButtonSlice,
        learn: learnSlice,
        timer: timerCountSlice,
        materialInput: materialInputSlice
    },
})