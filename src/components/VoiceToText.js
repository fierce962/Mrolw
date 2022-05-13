import React from "react";
import { TouchableHighlight, View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';
import { useSelector, useDispatch } from "react-redux";

import { changeStartRecord, ChangeNoSpeech } from "../features/pronunciation/pronunciationSlice";
import { assingModalParameters } from '../features/modal/modalSlice';

import ModalAnimate from "./ModalAnimate";
import FlotingMessage from "./FlotingMessage";

export default function VoiceToText(){
    const dispatch = useDispatch();
    const record = useSelector(state => state.pronunciation.startRecord);

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechError = onErrorHandler;

    function onSpeechStartHandler(e){
        //console.log(e);
    }

    function onSpeechResultsHandler(e){
        let correct = e.value.some(voiceResults => {
            if(voiceResults.includes('makes')) return true;
        });
        if(correct){
            dispatch(assingModalParameters({ type: 'check', message: 'La Pronunciacion fue correcta'}));
        }else{
            dispatch(assingModalParameters({ type: 'close', message: 'La Pronunciacion fue incorrecta'}));
        }
    }

    function onErrorHandler(e){
        dispatch(changeStartRecord());
        dispatch(ChangeNoSpeech(true));
    }

    function onSpeechEndHandler(e){
        dispatch(changeStartRecord());
    }

    function startVoice(){
        Voice.start('en-US');
        dispatch(changeStartRecord());
        dispatch(ChangeNoSpeech(false));
    }

    let animateInit = record ? new Animated.Value(50) : 50;
    if(record){
        Animated.loop(
            Animated.timing(animateInit, {
                toValue: 100,
                duration: 1000,
                useNativeDriver: false
            })
        ).start();
    }

    const styleAnimate = [
        style.tolgleAnimate,
        record && { width: animateInit }, 
        record && { height: animateInit },  
        { borderRadius: animateInit } 
    ]

    return (
        <View style={ style.voiceBody }>
            <View style={ style.contentVoice }>
                <ModalAnimate />
                <Animated.View style={ styleAnimate }>
                    <TouchableHighlight style={ style.buttonIcon } onPress={ startVoice }>
                        <Text>
                            <Icon name="microphone" size={ 30 } color="#000" />;
                        </Text>
                    </TouchableHighlight>
                </Animated.View>
                <FlotingMessage message={'No se detecto su voz'} topSpacing={ 90 }/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    voiceBody: {
        height: 140,
    },
    contentVoice: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    tolgleAnimate: {
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonIcon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
