import React from 'react';
import { useDispatch } from 'react-redux';

import { store } from '../../store/store';
import { createInput, setValueInputs } from '../../features/MaterialInput/materialInputSlice';
import { setParameters } from '../../features/FloatingButton/floatingButtonSlice';
import { assingwords, 
    setRenderInput,
    setRenderMessage,
    setRenderResultsOrInputs } from '../../features/TestAudio/testAudioSlice';

import { getStorage } from '../../models/Storage';
import { getWordsTestAudio } from '../../database/database';

class TestAudio{
    dispatch = useDispatch();

    clearTestAudio(){
        console.log('clear test audio');
    }

    onPressBtn(){
        const title = store.getState().floatingBtn.parameters.title;
        if(title === 'Comparar'){
            this.evaluateValueInputs();
        }else{
            this.dispatch(setRenderResultsOrInputs('results'));
        }
    }

    evaluateValueInputs(){
        const inputs = store.getState().materialInput.inputs;
        let count = 0;
        inputs.forEach((input, index) => {
            if(input.value !== ''){
                count++; 
            };
            this.dispatch(setRenderMessage({
                index: index,
                text: input.value
            }))
        });
        if(count === inputs.length){
            this.setParametersFloating(true, 'Ver las Respuestas')
        }
    }

    async getWords(){
        console.log('getwords');
        this.setParametersFloating(false, '');
        const maxId = await this.getMaxIdWords();
        const random = this.setRandomNumbers(maxId);
        const words = await getWordsTestAudio(random)
        this.dispatch(assingwords(words));
        this.dispatch(createInput(words));
        this.setParametersFloating(true, 'Comparar');
        this.dispatch(setRenderInput(true));
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

    getResults(){
        const results = [];
        const words = store.getState().testAudio.words;
        const inputs = store.getState().materialInput.inputs;
        const result = store.getState().testAudio.evaluateInputs;
        inputs.forEach((input, index) => {
            results.push({
                response: input.value,
                solution: words[index].english,
                result: result[index]
            });
        });
        console.log(results)
        return results;
    }
};

export const classTestAudio = new TestAudio();