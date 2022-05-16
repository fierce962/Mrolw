import { configureStore } from '@reduxjs/toolkit';
import wordelSlice from '../features/wordel/wordelSlice';
import pronunciationSlice from '../features/pronunciation/pronunciationSlice';
import modalSlice from '../features/modal/modalSlice';
import floatingButtonSlice from '../features/FloatingButton/floatingButtonSlice';

export const store = configureStore({
    reducer: {
        wordel: wordelSlice,
        pronunciation: pronunciationSlice,
        modal: modalSlice,
        floatingBtn: floatingButtonSlice
    },
})