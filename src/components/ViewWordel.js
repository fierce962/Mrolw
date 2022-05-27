import React, { useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import ModalAnimate from "./ModalAnimate";
import CreateWordel from './CreateWordel';
import CreateInputText from './CreateInputText';
import TextTitle from "./TextTitle";

import { setActualWorlde, createWordel, selectWordel, newAttempts, blurWordelFocus } from "../features/wordel/wordelSlice";
import { assingModalParameters } from '../features/modal/modalSlice';
import { loadWord } from "../features/pronunciation/pronunciationSlice";
import { removeLearn, errorLearn } from '../features/Learn/LearnSlice';

export default function ViewWordel({ route }){
    const state = useSelector(state => state.wordel.attempts);
    const finish = useSelector(state => state.wordel.finish);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    let actualText = '';

    useEffect(() => {
        if(finish[0]){
            const message = finish[1] === 'Fallaste' ? `Fallaste la respuesta correcta era: ${ route.params.english } no te preocupes puedes intentarlo pronto` : 'La traduccion fue correcta';
            const type = finish[1] === 'Fallaste' ? 'close' : 'check'; 
            const redirect = finish[1] === 'Fallaste' ? 'home' : 'voice';
            if(type === 'check'){
                dispatch(loadWord(route.params));
                dispatch(removeLearn());
            }else{
                dispatch(errorLearn());
            }
            dispatch(assingModalParameters({ type: type, message: message, route: redirect }));
        }
    });
    
    if(!finish[0] && state[0]){
        dispatch(createWordel(route.params.english.split('')));
    }

    function keyPress({ key, text }){
        dispatch(setActualWorlde({ key, text }))
    }

    function setFocusInput(index){
        inputRef.current.focus();
        dispatch(selectWordel(index))
    }

    function getBlurFocus(){
        dispatch(blurWordelFocus())
    }

    function Create(){
        return state.map((value, i) => {
            if(value){
                return (
                    <View key={ `viewWorlde${i}` } style={ style.viewWordel } >
                        <CreateWordel index={ i } setFocus={ setFocusInput } />
                        <CreateInputText pointerEvents={ 'none' } reference={ inputRef } blurFocus={ getBlurFocus } change={ keyPress } />
                    </View>
                )
            }else{
                return(
                    <View key={ `viewWorlde${i}` }  style={ style.viewWordel } pointerEvents='none'>
                        <CreateWordel index={ i } />
                    </View>
                )
            }
        })
    }

    return (
        <View style={ style.contentAll } >
            <ModalAnimate />
            <View style={ style.contentWordel } >
                <TextTitle text={ 'quiz' } typeStyle={ 'main' } />
                <TextTitle text={ `Traduzca: ${ route.params.espanish }` } typeStyle={ 'secundary' } />
                <Create />
                <View style={ style.btn } >
                    <Button onPress={ () => {
                            dispatch(newAttempts(route.params.english.split('')))
                            inputRef.current.focus();
                        }}
                        title="Next" />
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    contentAll:{
        height: '100%',
    },
    contentWordel: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewWordel: {
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        position: 'relative'
    },
    btn: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    textTitle: {
        color: 'white',
        fontSize: 30
    },
    text: {
        color: 'white'
    }
})