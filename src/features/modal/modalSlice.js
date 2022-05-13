import { createSlice } from "@reduxjs/toolkit";

const modalslice = createSlice({
    name: 'modal',
    initialState: {
        values: {
            visibleView: false,
            type: 'close' | 'check',
            message: ''
        }
    },
    reducers: {
        setChangeVisible(state) {
            state.values.visibleView = !state.values.visibleView;
        },
        assingModalParameters(state, action) {
            state.values.visibleView = true;
            state.values.type = action.payload.type;
            state.values.message = action.payload.message;
        }
    }
});

export default modalslice.reducer;
export const { setChangeVisible, assingModalParameters } = modalslice.actions;