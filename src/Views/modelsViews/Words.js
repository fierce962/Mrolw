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
                await this.getWordsLearn(previusWords); 
            }else{
                await this.getWordsForLearn(previusWords);
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

    async getWordsLearn(previusWords){
        let end = false;
        const long = previusWords.length;
        let wordsLearn = await getStorage('viewWordsLearn');
        if(wordsLearn === null){
            wordsLearn = await getWordsMinMaxRange(0, 20);
            await setStorage('viewWordsLearn', wordsLearn);
        }else if(long === 0 && wordsLearn.length > 20){
            console.log('se ya existen datos pero comenzo');
            wordsLearn.length = 20;
            console.log('wordsLearn', wordsLearn);
        }else if(long < wordsLearn.length){
            console.log('ya existen datos pero words todavia tiene');
            const newWords = [];
            for(let i = long; i < long + 10; i++){
                console.log('identro de ya existen datos', i);
                if(wordsLearn[i] === undefined){
                    break;
                }
                newWords.push(wordsLearn[i]);
            };
            wordsLearn = newWords;
        }else{
            console.log('entro a la busqueda', previusWords.length)
            const maxRange = long + 10 < this.permitedMaxRange ? long + 10 : this.permitedMaxRange;
            console.log('min', long, 'max', maxRange)
            if(long < maxRange){
                const words = await getWordsMinMaxRange(long, maxRange);
                console.log(words)
                words.forEach(word => {
                    wordsLearn.push(word);
                });
                await setStorage('viewWordsLearn', wordsLearn);
                wordsLearn = words;
            }else{
                console.log('se diparo el end')
                end = true;
                this.dispatch(setEnd(true));
            }
        };
        if(!end){
            this.dispatch(setLearnedWords(wordsLearn));
        }
    };
    
    async getWordsForLearn(previusWords){

    };

}


export const fnWords = new FnWords();