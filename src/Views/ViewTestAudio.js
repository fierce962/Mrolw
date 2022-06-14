import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Animated, ScrollView } from 'react-native';
import { useDispatch } from "react-redux";

import { setValueInputs } from "../features/MaterialInput/materialInputSlice";

import TextTitle from "../components/TextTitle";
import TextToSpeech from "../components/TextToSpeech";
import FloatingButton from "../components/FloatingButton";
import MaterialInput from '../components/MaterialInput';
import LoadingBooks from '../components/LoadingBooks';

import { testAudio } from './modelsViews/TestAudio';

function CreateInputs({ fnChange, wordItem, index }){
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
            <CreateMessage index={ index } />
        </View>
    )
};

function CreateMessage({ index }){
    const [renderMessage, setRender] = useState(false);
    const animate = useRef(true);

    if(testAudio.refSetRenderMessae[index] === undefined){
        testAudio.refSetRenderMessae.push(setRender);
    }
    if(!renderMessage) return null
    let animatedMessage = new Animated.Value(0);
    if(animate.current){
        Animated.timing(animatedMessage, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
        animate.current = false;
    };

    return (
        <Animated.View style={[ style.contentMenssage, { width: animatedMessage.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%']     
        })  }, { backgroundColor: testAudio.evaluateInputs[index] ? 'green' : 'red' } ]}>
            <TextTitle text={  testAudio.evaluateInputs[index] ? 'correcto' : 'incorrecto' } 
            typeStyle={ 'main' } />
        </Animated.View>
    )
}

function ListIputs({ changeValueInputs }){
    return testAudio.words.map((wordItem, index) => (
        <CreateInputs key={ `inputs${index}` }
            fnChange={ changeValueInputs } 
            wordItem={ wordItem } 
            index={ index } />
    ));
}

function CreateListInputs({ changeValueInputs }){
    const [renderList, setRenderList] = useState(false);
    if(testAudio.refListInputs === undefined){
        testAudio.refListInputs = setRenderList;
    }
    if(!renderList) return <LoadingBooks render={ true } />
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <ScrollView keyboardShouldPersistTaps={ 'always' }>
                    <ListIputs changeValueInputs={ changeValueInputs }/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default function ViewTestAudio(){
    const dispatch = useDispatch();

    useEffect(() => {
        testAudio.getWords();
        return () => {
            testAudio.clearTestAudio();
        }
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
                <Text style={[ { color: '#fff' }, { textAlign: 'justify' } ]}>Se te proporcionara una lista de 
                    palabras que ya has aprendido deberas escucharla y escribir que palabra es,
                    la seleccion se realiza de forma aleatorea.
                </Text>
            </View>
            <CreateListInputs
                changeValueInputs={ changeValueInputs } />
            <View>
                <FloatingButton fnPress={ () => {
                    testAudio.evaluateValueInputs();
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
        alignItems: 'center'
    }
});

