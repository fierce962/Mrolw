import React from 'react';
import { useDispatch } from 'react-redux';

import { store } from '../../store/store';
import { createInput } from '../../features/MaterialInput/materialInputSlice';
import { setParameters } from '../../features/FloatingButton/floatingButtonSlice';

import { getStorage } from '../../models/Storage';
import { getWordsTestAudio } from '../../database/database';

class TestAudio{
    words = [];
    refListInputs;
    refSetRenderMessae = [];
    evaluateInputs = [];
    dispatch = useDispatch();

    clearTestAudio(){
        console.log('clear test audio');
        this.words = [];
        this.refListInputs = undefined;
        this.refSetRenderMessae = [];
        this.evaluateInputs = [];
    }

    evaluateValueInputs(){
        const inputs = store.getState().materialInput.inputs;
        inputs.forEach((input, index) => {
            if(this.evaluateInputs[index] === undefined){
                this.evaluateInputs.push(false);
            }
            if(input.value !== ''){
                this.evaluateInputs[index] = input.value === this.words[index].english;
                this.refSetRenderMessae[index](true);
            };
        });
    }

    async getWords(){
        this.setParametersFloating(false, '');
        const maxId = await this.getMaxIdWords();
        const random = this.setRandomNumbers(maxId);
        this.words = await getWordsTestAudio(random);
        this.dispatch(createInput(this.words));
        this.setParametersFloating(true, 'Comparar');
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