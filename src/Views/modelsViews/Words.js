import React from "react";
import { store } from '../../store/store';

import { getStorage, setStorage } from "../../models/Storage";
import { setNewSelectMenu, setLearnedWords, changeOpenWordByIndex, setEnd } from '../../features/words/wordsSlice';
import { getWordsMinMaxRange } from '../../database/database';

class FnWords{
    dispatch;
    permitedMaxRange;
    permitedSearhWords = true;
    
    changeMenuSelected(select){
        this.permitedMaxRange = undefined;
        this.permitedSearhWords = true;
        this.dispatch(setNewSelectMenu(select));
        this.getWordsDb();
    }

    changeOpenWord(index, animatedUsed, wordOpen){
        animatedUsed.current =  wordOpen ? true : null;
        this.dispatch(changeOpenWordByIndex(index));
    }

    async getWordsDb(){
        const menuSelect = store.getState().words.menuSelect;
        const previusWords = store.getState().words.wordsSelect;
        await this.getUserPermitedRange(menuSelect);
        if(this.permitedSearhWords){
            this.permitedSearhWords = false;
            if(menuSelect === 0){
                await this.getWords(previusWords, 'viewWordsLearn'); 
            }else{
                await this.getWords(previusWords, 'wordsForLearn');
            }
            this.permitedSearhWords = true;
        }
    }

    async getUserPermitedRange(menuSelect){
        console.log('meun select', menuSelect)
        if(this.permitedMaxRange === undefined){
            console.log('max permited is undefined')
            const user = await getStorage('user');
            if(user.words !== undefined){
                const maxId = user.words.maxId;
                console.log('maxrangepermited', maxId)
                this.permitedMaxRange = menuSelect === 0 ? maxId - 10 : maxId + 105;
            }
        }
    };

    async getWords(previusWords, nameStoreWords){
        let end = false;
        const long = previusWords.length;
        let wordsLearn = await getStorage(nameStoreWords);
        if(wordsLearn !== null && long === 0 && wordsLearn.length > 20){
            console.log('fue distito de null')
            wordsLearn.length = 20;
        }else if(wordsLearn !== null && long < wordsLearn.length){
            console.log('estaban guardadas')
            const newWords = [];
            for(let i = long; i < long + 10; i++){
                if(wordsLearn[i] === undefined){
                    break;
                }
                newWords.push(wordsLearn[i]);
            };
            wordsLearn = newWords;
        }else{
            if(wordsLearn === null) wordsLearn = [];
            const rangeAndValid = this.getRangesAndValid(nameStoreWords, long, previusWords);
            console.log('rangeandvalid', rangeAndValid);
            if(rangeAndValid[0]){
                const words = await getWordsMinMaxRange(rangeAndValid[1], rangeAndValid[2]);
                words.forEach(word => {
                    wordsLearn.push(word);
                });
                await setStorage(nameStoreWords, wordsLearn);
                wordsLearn = words;
            }else{
                end = true;
                this.dispatch(setEnd(true));
            }
        };
        if(!end){
            this.dispatch(setLearnedWords(wordsLearn));
        }
    };

    getRangesAndValid(nameStoreWords, long, previusWords){
        let minRange;
        let maxRange;
        if(nameStoreWords === 'viewWordsLearn'){
            minRange = long;
            if(minRange === 0){
                if(this.permitedMaxRange < 20){
                    maxRange = this.permitedMaxRange;
                }else{
                    maxRange = 20;
                }
            }else{
                maxRange = minRange + 10 < this.permitedMaxRange ? minRange + 10 : this.permitedMaxRange;
            }
            return [long < maxRange, minRange, maxRange]
        }else{
            if(long === 0){
                minRange = this.permitedMaxRange - 104;
                maxRange = minRange + 20;
            }else{
                minRange = previusWords[long - 1].id + 1;
                maxRange = minRange + 10 < this.permitedMaxRange ? minRange + 10 : this.permitedMaxRange;
            }
            return [minRange < this.permitedMaxRange, minRange, maxRange];
        }
    }
}


export const fnWords = new FnWords();