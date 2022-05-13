import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";

import VoiceToText from "./VoiceToText";
import TextTitle from "./TextTitle";

export default function ViewPronunciation(){
    const pronunciation = useSelector(state => state.pronunciation.words);
    const testEnd = useSelector(state => state.pronunciation.testEnd);

    return (
        <View style={ style.contentPronunciation }>
            <View>
                <View style={ style.viewTitle }>
                    <TextTitle typeStyle={ 'main' }  text={ `Pronunacion de ${pronunciation.english}` } />
                </View>
                <TextTitle typeStyle={ 'secundary' }  
                    text={ 'Transformando de la pronunciacion en ingles utilizando el alfabeto fonetico en español seria' }/>
            </View>
            <View style={ style.contenCentral }>
                <View style={ style.pronunciationView }>
                    <Text style={ style.textPronunciation }>{ pronunciation.pronunciationSpanish }</Text>
                </View>
                <View style={ { alignItems: 'center' } }>
                    <Text style={ style.text }>Ponte a prueba intentalo</Text>
                </View>
            </View>
            <View>
                <VoiceToText />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    contentPronunciation: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 15
    },
    viewTitle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    contenCentral: {
        flex: 1,
        justifyContent: 'space-between'
    },
    pronunciationView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPronunciation: {
        color: 'white',
        fontSize: 40
    },
    text: {
        color: 'white',
        fontSize: 16
    }
});