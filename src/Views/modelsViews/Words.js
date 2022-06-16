import React from "react";
import { store } from '../../store/store';

import { getStorage } from "../../models/Storage";
import { setNewSelectMenu, setLearnedWords, changeOpenWordByIndex, setEnd } from '../../features/words/wordsSlice';
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
        const previusWords = store.getState().words.wordsSelect.length;
        const [minRange, maxRange] = await this.getRanges();
        console.log(minRange, maxRange, this.lastMaxRange, this.permitedMaxRange);
        if(previusWords === 0 || minRange !== 0){
            const wordsDb = await getWordsMinMaxRange(minRange, maxRange);
            this.dispatch(setLearnedWords(wordsDb));
        }else{
            console.log('end')
            this.dispatch(setEnd(true));
        }
    }

    async getRanges(){
        if(this.lastMaxRange === undefined){
            const user = await getStorage('user');
            const userMaxIdWords = user.words.maxId - 5;
            const maxRange = userMaxIdWords <= 20 ? userMaxIdWords : 20;
            this.lastMaxRange = maxRange;
            this.permitedMaxRange = userMaxIdWords;
            return [0, maxRange]; 
        }else if(this.lastMaxRange + 1 <= this.permitedMaxRange){
            const minRange = this.lastMaxRange + 1;
            const maxRange = minRange + 10 <= this.permitedMaxRange ? minRange + 10 : this.permitedMaxRange;
            this.lastMaxRange = maxRange;
            return [minRange, maxRange];
        }else{
            return [0, 0];
        }
    }
}


export const fnWords = new FnWords();