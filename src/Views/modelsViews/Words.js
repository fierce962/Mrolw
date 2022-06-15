import React from "react";

import { setNewSelectMenu, setLearnedWords } from '../../features/words/wordsSlice';
import { getWordsMinMaxRange } from '../../database/database';

class FnWords{
    dispatch;
    
    changeMenuSelected(select){
        console.log('change', select);
        this.dispatch(setNewSelectMenu(select));
    }

    async getWordsDb(){
        const words = await getWordsMinMaxRange(0, 10);
        console.log('wrods', words.length);
        this.dispatch(setLearnedWords(words));
    }
}


export const fnWords = new FnWords();