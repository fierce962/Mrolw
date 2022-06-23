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
        if(select === 1){
            this.permitedMaxRange += 110; 
        }else{
            this.permitedMaxRange = undefined;
        };
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
        if(this.permitedMaxRange === undefined){
            console.log('max permited is undefined')
            const user = await getStorage('user');
            if(user.words !== undefined){
                const maxId = user.words.maxId;
                this.permitedMaxRange = menuSelect === 0 ? maxId - 10 : maxId + 105 ;
            }
        }
    };

    async getWords(previusWords, nameStoreWords){
        let end = false;
        const long = previusWords.length;
        let wordsLearn = await getStorage(nameStoreWords);
        if(wordsLearn === null){
            wordsLearn = await getWordsMinMaxRange(0, 20);
            await setStorage(nameStoreWords, wordsLearn);
        }else if(long === 0 && wordsLearn.length > 20){
            wordsLearn.length = 20;
        }else if(long < wordsLearn.length){
            const newWords = [];
            for(let i = long; i < long + 10; i++){
                if(wordsLearn[i] === undefined){
                    break;
                }
                newWords.push(wordsLearn[i]);
            };
            wordsLearn = newWords;
        }else{
            let words
            if(nameStoreWords === 'viewWordsLearn'){
                words = await this.getWordsLearned(long, wordsLearn, nameStoreWords);
            }else{
                words = await this.getWordsForLearn(long, previusWords, nameStoreWords);
            }
            end = words[0];
            wordsLearn = words[1];
        };
        if(!end){
            this.dispatch(setLearnedWords(wordsLearn));
        }
    };

    async getWordsLearned(long, wordsLearn, nameStoreWords){
        console.log('entro en words learned')
        const maxRange = long + 10 < this.permitedMaxRange ? long + 10 : this.permitedMaxRange;
        if(long < maxRange){
            const words = await getWordsMinMaxRange(long, maxRange);
            words.forEach(word => {
                wordsLearn.push(word);
            });
            await setStorage(nameStoreWords, wordsLearn);
            return [false, words];
        }else{
            this.dispatch(setEnd(true));
            return [true];
        }
    };

    async getWordsForLearn(long, previusWords, nameStoreWords){
        const lastIdRange = previusWords[long - 1].maxId; 
        const minRange = lastIdRange + 1;
        const maxRange = lastIdRange + 11;
        if(maxRange < this.permitedMaxRange){
            const words = await getWordsMinMaxRange(minRange, maxRange);
            words.forEach(word => {
                wordsLearn.push(word);
            });
            await setStorage(nameStoreWords, wordsLearn);
            return [false, words];
        }else{
            this.dispatch(setEnd(true));
            return [true];
        }
    }

}


export const fnWords = new FnWords();