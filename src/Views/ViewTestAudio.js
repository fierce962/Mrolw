import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Animated } from 'react-native';
import { useDispatch } from "react-redux";
import { store } from '../store/store';

import { createInput, setValueInputs } from "../features/MaterialInput/materialInputSlice";

import TextTitle from "../components/TextTitle";
import TextToSpeech from "../components/TextToSpeech";
import FloatingButton from "../components/FloatingButton";
import MaterialInput from '../components/MaterialInput';
import LoadingBooks from '../components/LoadingBooks';

import { testAudio } from './modelsViews/TestAudio';

function CreateInputs({ fnChange, index, refRenderMessage, wordItem }){
    const [focus, setFocus] = useState(false);
    const styleInput = [
        style.contentTest,
        focus && style.contentTestFocus
    ];
    return(
        <View style={ styleInput }>
            <View style={ style.materialInputContent }>
                <MaterialInput placeholderText={ 'Cual es la palabra?' } 
                    index={ index } 
                    fnFocus={ () => setFocus(true) }
                    fnBlur={ () => setFocus(false) }
                    fnOnchange={ (text) => fnChange(text, index) }
                    extraStyle={ { margin: 0, borderBottomWidth: 0, paddingLeft: 10 } } />
            </View>
            <View style={ style.contentSpeech }>
                <TextToSpeech textSpeech={ wordItem.english } />
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

    return (
        <Animated.View style={[ style.contentMenssage, { width: animatedMessage.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%']     
        })  } ]}>
            <TextTitle text={ 'incorrecto' } typeStyle={ 'main' } />
        </Animated.View>
    )
}

function CreateListInputs({ refSetRenderMessae, changeValueInputs }){
    const [renderList, setRenderList] = useState(false);
    if(testAudio.refListInputs === undefined){
        testAudio.refListInputs = setRenderList;
    }
    if(!renderList) return <LoadingBooks render={ true } />
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <FlatList data={ testAudio.words } renderItem={({ item, index }) => {
                return <CreateInputs index={ index }
                    wordItem={ item } 
                    fnChange={ changeValueInputs } 
                    refRenderMessage={ refSetRenderMessae } /> } 
            }/>
        </KeyboardAvoidingView>
    )
}

export default function ViewTestAudio(){
    const refSetRenderMessae = [];
    const dispatch = useDispatch();

    useEffect(() => {
        testAudio.getWords();
    })

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
                <Text style={ { color: '#fff' } }>Se te proporcionara una lista de 
                    palabras que ya has aprendido deberas escucharla y escribir que palabra es,
                    la seleccion se realiza de forma aleatorea.
                </Text>
            </View>
            <CreateListInputs refSetRenderMessae={ refSetRenderMessae } 
                changeValueInputs={ changeValueInputs } />
            <View>
                <FloatingButton fnPress={ () => {
                    const inputs = store.getState().materialInput.inputs;
                    inputs.forEach((input, index) => {
                        if(input.value !== ''){
                            refSetRenderMessae[index](true);
                        }
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

