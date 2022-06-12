import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Animated } from 'react-native';

import { useDispatch } from "react-redux";
import { setParameters } from "../features/FloatingButton/floatingButtonSlice";
import { createInput, setValueInputs } from "../features/MaterialInput/materialInputSlice";


import TextTitle from "../components/TextTitle";
import TextToSpeech from "../components/TextToSpeech";
import FloatingButton from "../components/FloatingButton";
import MaterialInput from '../components/MaterialInput';

function CreateInputs({ fnChange, index, refRenderMessage }){
    const [focus, setFocus] = useState(false);
    const styleInput = [
        style.contentTest,
        focus && style.contentTestFocus
    ];

    return(
        <View style={ styleInput }>
            <View style={ style.materialInputContent }>
                <MaterialInput placeholderText={ 'test' } 
                    index={ index } 
                    fnFocus={ () => setFocus(true) }
                    fnBlur={ () => setFocus(false) }
                    fnOnchange={ (text) => fnChange(text, index) }
                    extraStyle={ { margin: 0, borderBottomWidth: 0, paddingLeft: 10 } } />
            </View>
            <View style={ style.contentSpeech }>
                <TextToSpeech />
            </View>
            <CreateMessage refSetRenderMessae={ refRenderMessage } index={ index } />
        </View>
    )
};

function CreateMessage({ refSetRenderMessae, index }){
    const [renderMessage, setRender] = useState(false);
    if(refSetRenderMessae[index] === undefined){
        refSetRenderMessae.push(setRender);
    }
    if(!renderMessage) return null

    let animatedMessage = new Animated.Value(0);
    Animated.timing(animatedMessage, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
    }).start();
    console.log(animatedMessage)
    return (
        <Animated.View style={[ style.contentMenssage, { width: animatedMessage.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%']     
        })  } ]}>
            <TextTitle text={ 'incorrecto' } typeStyle={ 'main' } />
        </Animated.View>
    )
}

export default function TestAudio(){
    const dispatch = useDispatch();
    dispatch(setParameters({
        view: true,
        title: 'Comparar'
    }))

    const testInputs = ['test', 'test', 'test', 'test', 'test'];
    const refSetRenderMessae = [];

    dispatch(createInput(testInputs))

    function changeValueInputs(text, i){
        dispatch(setValueInputs({
            index: i,
            inputValue: text
        }))
    }

    return (
        <View style={ style.containerTestAudio }>
            <View>
                <TextTitle text={ 'Test con audio' } typeStyle={ 'main' } />
                <Text style={ { color: '#fff' } }>Se te proporcionara una de las 
                    palabras que ya has aprendido deberas escucharla y escribir que palabra es,
                    la seleccion se realiza de forma aleatorea.
                </Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? "padding" : "height"}>
                <FlatList data={ testInputs } renderItem={({ index }) => {
                    return <CreateInputs index={ index } 
                        fnChange={ changeValueInputs } 
                        refRenderMessage={ refSetRenderMessae } /> } 
                }/>
            </KeyboardAvoidingView>
            <View>
                <FloatingButton fnPress={ () => {
                    refSetRenderMessae.forEach((setRender) => {
                        setRender(true);
                    })
                }} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    containerTestAudio: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    contentTest: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 15,
        position: 'relative',
        overflow: 'hidden'
    },
    contentTestFocus: {
        borderColor: '#cc0000'
    },  
    contentSpeech: {
        paddingLeft: 5,
        paddingRight: 5,
        borderLeftWidth: 2,
        borderColor: '#aaa'
    },
    materialInputContent: {
        flex: 1
    },
    contentMenssage: {
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
});

