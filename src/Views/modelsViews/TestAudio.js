import React from 'react';
import { useDispatch } from 'react-redux';

import { createInput } from '../../features/MaterialInput/materialInputSlice';
import { setParameters } from '../../features/FloatingButton/floatingButtonSlice';

import { getStorage } from '../../models/Storage';
import { getWordsTestAudio } from '../../database/database';

class TestAudio{
    words = [];
    refListInputs;
    dispatch = useDispatch();



    async getWords(){
        this.setParametersFloating(false, '');
        const maxId = await this.getMaxIdWords();
        const random = this.setRandomNumbers(maxId);
        this.words = await getWordsTestAudio(random);
        this.dispatch(createInput(this.words));
        this.setParametersFloating(false, 'Comparar');
        this.refListInputs(true);
    };

    setParametersFloating(view, title){
        this.dispatch(setParameters({
            view: view,
            title: title
        }));
    }

    setRandomNumbers(maxId, random = []){
        const newRandom = parseInt(Math.random() * maxId);
        if(!random.includes(newRandom)){
            random.push(newRandom);
        }
        if(random.length <= 5){
            this.setRandomNumbers(maxId, random);
        }
        return random;
    }

    async getMaxIdWords(){
        const user = await getStorage('user');
        return user.words.maxId;
    };
};

export const testAudio = new TestAudio();