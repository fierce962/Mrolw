import React from "react";
import { store } from '../../store/store';

import { getStorage, setStorage } from "../../models/Storage";
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
        console.log('minrange', minRange, maxRange)
        let wordsDb;
        if(previusWords === 0 || minRange !== 0){
            const [saveName, localSave] = await this.checkLocalSaveWords(minRange);
            console.log('saveName', saveName)
            if(typeof(localSave) !== 'string' && localSave.length >= 10){
                wordsDb = localSave;
                console.log('ya estaba completo el localsave')
            }else{
                console.log('no habia local o estaba incompleto')
                let rest = typeof(localSave) !== 'string' ? localSave.length : 0;
                console.log('rest value', rest);
                console.log('minrange+5', minRange + rest, maxRange);
                if(minRange + rest < maxRange){
                    console.log('se ejecuto la busqueda')
                    wordsDb = await getWordsMinMaxRange(minRange + rest, maxRange);
                }else{
                    console.log('no se ejecuto la busqueda')
                }
                let save = wordsDb;
                if(typeof(localSave) !== 'string' && wordsDb !== undefined){
                    wordsDb.forEach(word => {
                        localSave.push(word);
                    });
                    save = localSave;
                }
                if(save !== undefined){
                    await setStorage(saveName, save);
                }
            };
            if(wordsDb !== undefined){
                this.dispatch(setLearnedWords(wordsDb));
            }
        }else{
            console.log('end')
            this.dispatch(setEnd(true));
        }
    }

    async checkLocalSaveWords(minRange){
        const searchLocal = minRange === 0 ? `wordsSave020` : `wordsSave${minRange}${minRange+10}`;
        const localWords = await getStorage(searchLocal);
        return [searchLocal, localWords !== null ? localWords : 'none'];
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