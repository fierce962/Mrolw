import React from 'react';
import { useDispatch } from 'react-redux';

import { store } from '../../store/store';
import { createInput, setValueInputs } from '../../features/MaterialInput/materialInputSlice';
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

    onPressBtn(){
        const title = store.getState().floatingBtn.parameters.title;
        if(title === 'Comparar'){
            this.evaluateValueInputs();
        }else{
            console.log('mostrar respuestas')
        }
    }

    evaluateValueInputs(){
        const inputs = store.getState().materialInput.inputs;
        let count = 0;
        inputs.forEach((input, index) => {
            if(this.evaluateInputs[index] === undefined){
                this.evaluateInputs.push(false);
            }
            if(input.value !== ''){
                this.evaluateInputs[index] = input.value.toLowerCase() === this.words[index].english.toLowerCase();
                this.refSetRenderMessae[index](true);
                count++; 
            };
        });
        if(count === this.words.length){
            this.setParametersFloating(true, 'Ver las Respuestas')
        }
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

    changeValueInputs(text, i){
        this.dispatch(setValueInputs({
            index: i,
            inputValue: text
        }))
    };
};

export const testAudio = new TestAudio();