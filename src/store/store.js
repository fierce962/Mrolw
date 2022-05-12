import { configureStore } from '@reduxjs/toolkit';
import wordelSlice from '../features/wordel/wordelSlice';
import pronunciationSlice from '../features/pronunciation/pronunciationSlice';

export const store = configureStore({
    reducer: {
        wordel: wordelSlice,
        pronunciation: pronunciationSlice
    },
})