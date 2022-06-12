import React from "react";
import { View, Text, StyleSheet } from 'react-native';

import { useDispatch } from "react-redux";
import { setParameters } from "../features/FloatingButton/floatingButtonSlice";

import TextTitle from "../components/TextTitle";
import TextToSpeech from "../components/TextToSpeech";
import FloatingButton from "../components/FloatingButton";
import MaterialInput from '../components/MaterialInput';

export default function TestAudio(){
    const dispatch = useDispatch();
    dispatch(setParameters({
        view: true,
        title: 'Comparar'
    }))

    return (
        <View style={ { flex: 1 } }>
            <TextTitle text={ 'Test con audio' } typeStyle={ 'main' } />
            <Text style={ { color: '#fff' } }>Se te proporcionara una de las 
                palabras que ya has aprendido deberas escucharla y escribir que palabra es,
                la seleccion se realiza de forma aleatorea.
            </Text>
            <MaterialInput />
            <TextToSpeech />
            <FloatingButton />
        </View>
    )
}

const style = StyleSheet.create({
    contentTest: {
        flex: 1,
    },
});

