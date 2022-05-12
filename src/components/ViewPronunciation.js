import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import VoiceToText from "./VoiceToText";
import TextTitle from "./TextTitle";

export default function ViewPronunciation(){
    const pronunciation = useSelector(state => state.pronunciation.words);
    const testEnd = useSelector(state => state.pronunciation.testEnd);
    console.log('correcto', testEnd)
    return (
        <View style={ style.contentPronunciation }>
            <View style={ style.viewTitle }>
                <TextTitle typeStyle={ 'main' }  text={ `Pronunacion de ${pronunciation.english}` } />
            </View>
            <TextTitle typeStyle={ 'secundary' }  text={ 'En español Seria' }/>
            <Text style={ style.text }>{ pronunciation.pronunciationSpanish }</Text>
            <VoiceToText />
        </View>
    );
}

const style = StyleSheet.create({
    viewTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle: {
        marginLeft: 30
    },
    contentPronunciation: {
        padding: 15
    },
    text: {
        color: 'white',
        marginLeft: 15
    }
});