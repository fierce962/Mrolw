import React from "react";
import { store } from '../../store/store';

import { getStorage } from "../../models/Storage";
import { setNewSelectMenu, setLearnedWords, changeOpenWordByIndex } from '../../features/words/wordsSlice';
import { getWordsMinMaxRange } from '../../database/database';

class FnWords{
    dispatch;
    lastMaxRange;
    permitedMaxRange;
    
    changeMenuSelected(select){
        console.log('change', select);
        this.dispatch(setNewSelectMenu(select));
    }

    changeOpenWord(index, animatedUsed, wordOpen){
        animatedUsed.current =  wordOpen ? true : null;
        this.dispatch(changeOpenWordByIndex(index));
    }

    async getWordsDb(){
        console.log('getwordsdb')
        const previusWords = store.getState().words.wordsSelect.length;
        const [minRange, maxRange] = await this.getRanges();
        console.log(minRange, maxRange, this.lastMaxRange);
        if(previusWords === 0 || minRange !== 0){
            const wordsDb = await getWordsMinMaxRange(minRange, maxRange);
            this.dispatch(setLearnedWords(wordsDb));
        }
    }

    async getRanges(){
        if(this.lastMaxRange === undefined){
            const user = await getStorage('user');
            const userMaxIdWords = user.maxId - 5;
            const maxRange = userMaxIdWords <= 20 ? userMaxIdWords : 20;
            this.lastMaxRange = maxRange;
            this.permitedMaxRange = userMaxIdWords;
            return [0, maxRange]; 
        }else{
            const minRange = this.lastMaxRange + 1;
            const maxRange = minRange + 10 <= this.permitedMaxRange ? minRange + 10 : this.permitedMaxRange;
            console.log('getrange', minRange, maxRange, this.permitedMaxRange)
            this.lastMaxRange = maxRange;
            return [minRange, maxRange];
        }
    }
}


export const fnWords = new FnWords();