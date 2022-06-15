import React from "react";

import { setNewSelectMenu } from '../../features/words/wordsSlice';

class FnWords{
    dispatch;
    
    changeMenuSelected(select){
        console.log('change', select);
        this.dispatch(setNewSelectMenu(select));
    }
}


export const fnWords = new FnWords();