import React from 'react';
import { useDispatch } from 'react-redux';

import { store } from '../../store/store';
import { createInput, setValueInputs } from '../../features/MaterialInput/materialInputSlice';
import { setParameters } from '../../features/FloatingButton/floatingButtonSlice';
import { assingwords, setRenderInput, setRenderMessage } from '../../features/TestAudio/testAudioSlice';

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
            console.log('mostrar respuestas')
        }
    }

    evaluateValueInputs(){
        const inputs = store.getState().materialInput.inputs;
        let count = 0;
        inputs.forEach((input, index) => {
            if(input.value !== ''){
                this.dispatch(setRenderMessage({
                    index: index,
                    evaluateInputs: input.value.toLowerCase() === this.words[index].english.toLowerCase()
                }))
                count++; 
            }else{
                this.dispatch(setRenderMessage({
                    index: index,
                    evaluateInputs: undefined
                }))
            };
        });
        if(count === inputs.length){
            this.setParametersFloating(true, 'Ver las Respuestas')
        }
    }

    async getWords(){
        this.setParametersFloating(false, '');
        const maxId = await this.getMaxIdWords();
        const random = this.setRandomNumbers(maxId);
        this.dispatch(assingwords(await getWordsTestAudio(random)));
        this.dispatch(createInput(this.words));
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
};

export const testAudio = new TestAudio();