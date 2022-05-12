import React from "react";
import { TouchableHighlight, View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';
import { useSelector, useDispatch } from "react-redux";
import { changeStartRecord, textEnd } from "../features/pronunciation/pronunciationSlice";

export default function VoiceToText(){
    const dispatch = useDispatch();
    const record = useSelector(state => state.pronunciation.startRecord);

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechError = onErrorHandler;

    function onSpeechStartHandler(e){
        console.log(e);
    }

    function onSpeechResultsHandler(e){
        let correct = e.value.some(voiceResults => {
            if(voiceResults.includes('makes')) return true;
        });
        if(correct){
            dispatch(textEnd());
        }
    }

    function onErrorHandler(e){
        dispatch(changeStartRecord());
    }

    function onSpeechEndHandler(e){
        dispatch(changeStartRecord());
    }

    function startVoice(){
        Voice.start('en-US');
        dispatch(changeStartRecord());
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
        <View style={ style.contentVoice }>
            <Animated.View style={ styleAnimate }>
                <TouchableHighlight style={ style.buttonIcon } onPress={ startVoice }>
                    <Text>
                        <Icon name="microphone" size={ 30 } color="#000" />;
                    </Text>
                </TouchableHighlight>
            </Animated.View>
        </View>
    )
}

const style = StyleSheet.create({
    contentVoice: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tolgleAnimate: {
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
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
