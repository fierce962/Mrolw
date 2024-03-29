import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import VoiceToText from "./VoiceToText";
import TextTitle from "./TextTitle";
import TextToSpeech from "./TextToSpeech";


export default function ViewPronunciation(){
    const pronunciation = useSelector(state => state.pronunciation.words);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if(e.data.action.type === 'GO_BACK'){
                e.preventDefault();
                navigation.navigate('home');
            }
        });
    })

    return (
        <View style={ style.contentPronunciation }>
            <View>
                <View style={ style.viewTitle }>
                    <TextTitle typeStyle={ 'main' }  text={ `Pronunacion de ${ pronunciation.english }` } />
                </View>
                <TextTitle typeStyle={ 'secundary' }  
                    text={ pronunciation.pronunciationSpanish !== undefined ? 'Transformando de la pronunciacion en ingles utilizando el alfabeto fonetico en español seria'
                            : 'No logramos conseguir una transformar esta palabra. lo setimos, puedes ayudarte escuchando su pronunciacion' }/>
            </View>
            <View style={ style.contenCentral }>
                <View style={ style.pronunciationView }>
                    <Text style={ style.textPronunciation }>
                        { pronunciation.pronunciationSpanish === undefined ? pronunciation.english :
                            pronunciation.pronunciationSpanish }
                    </Text>
                    <TextToSpeech textSpeech={ pronunciation.english }/>
                </View>
                <View style={ { alignItems: 'center' } }>
                    <Text style={ style.text }>Ponte a prueba intentalo</Text>
                </View>
            </View>
            <View>
                <VoiceToText evaluatedText={ pronunciation.english }/>
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
        alignItems: 'center',
        flexDirection: 'row'
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
