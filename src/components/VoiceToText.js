import React, { useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { ChangeNoSpeech } from "../features/pronunciation/pronunciationSlice";
import { assingModalParameters } from '../features/modal/modalSlice';
import { setParameters } from "../features/FloatingButton/floatingButtonSlice";

import ModalAnimate from "./ModalAnimate";
import FlotingMessagePronunciation from "./FlotingMessagePronunciation";
import VoiceIconAnimated from "./VoiceIconAnimated";
import FloatingButton from "./FloatingButton";

export default function VoiceToText({ evaluatedText }){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const results = [];

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;
        Voice.onSpeechError = onErrorHandler;
    });

    function onSpeechStartHandler(e){
        //console.log(e);
    }

    function onSpeechResultsHandler(e){
        console.log('values', e.value)
        let correct = e.value.some(voiceResults => {
            if(voiceResults.toLocaleLowerCase()
                .includes(evaluatedText.toLocaleLowerCase())) return true;
        });
        if(correct){
            dispatch(assingModalParameters({ type: 'check', message: 'La Pronunciacion fue correcta', route: 'home' }));
        }else{
            dispatch(assingModalParameters({ type: 'close', message: 'La Pronunciacion fue incorrecta puedes intentarlo cuantas veces quieras' }));
            dispatch(setParameters({ title: 'salir', view: true }))
        }
        Voice.destroy();
    }

    function onErrorHandler(e){
        console.log('error handler')
        dispatch(ChangeNoSpeech(true));
    }

    function startVoice(){
        Voice.start('en-US');
        dispatch(ChangeNoSpeech(false));
    }

    function stopVoice(){
        Voice.stop();
    }

    return (
        <View style={ style.voiceBody }>
            <View style={ style.contentVoice }>
                <ModalAnimate />
                <VoiceIconAnimated fnPressIn={ startVoice } fnPressOut={ stopVoice } />
                <FlotingMessagePronunciation message={'No se detecto su voz'} topSpacing={ 90 }/>
            </View>
            <FloatingButton fnPress={ () => navigation.navigate('home') }/>
        </View>
    )
}

const style = StyleSheet.create({
    voiceBody: {
        height: 140,
        position: 'relative'
    },
    contentVoice: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

})
