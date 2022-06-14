import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Animated, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";

import TextTitle from "../components/TextTitle";
import TextToSpeech from "../components/TextToSpeech";
import FloatingButton from "../components/FloatingButton";
import MaterialInput from '../components/MaterialInput';
import LoadingBooks from '../components/LoadingBooks';

import { classTestAudio } from './modelsViews/TestAudio';

function CreateInputs({ wordItem, index }){
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
                    fnOnchange={ (text) => classTestAudio.changeValueInputs(text, index) }
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
    const renderMessage = useSelector(state => state.testAudio.renderMessage[index]);
    const evaluateInputs = useSelector(state => state.testAudio.evaluateInputs[index]);
    const animate = useRef(true);

    if(renderMessage === undefined || !renderMessage) return null
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
        })  }, { backgroundColor: evaluateInputs ? 'green' : 'red' } ]}>
            <TextTitle text={  evaluateInputs ? 'correcto' : 'incorrecto' } 
            typeStyle={ 'main' } />
        </Animated.View>
    )
}

function ListIputs(){
    const words = useSelector(state => state.testAudio.words);
    return words.map((wordItem, index) => (
        <CreateInputs key={ `inputs${index}` }
            wordItem={ wordItem } 
            index={ index } />
    ));
}

function CreateListInputs(){
    const renderList = useSelector(state => state.testAudio.listInputs);
    if(!renderList) return <LoadingBooks render={ true } />
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? "padding" : "height"}>
            <ScrollView keyboardShouldPersistTaps={ 'always' }>
                    <ListIputs />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

function Results(){
    const results = classTestAudio.getResults();

    return (
        <View>
            <TextTitle text={ 'Resultados' } typeStyle={ 'secundary' }/>
            <View style={ style.resultsViews }>
                <Text style={[ style.text, style.textResults ]}>Tu respuesta</Text>
                <Text style={[ style.text, style.textResults ]}>Solucion</Text>
            </View>
            <FlatList data={ results }
                renderItem={({ item, index }) => <ListResults item={ item } index={ index } /> }
            />
        </View>
    )
}

function ListResults({ item, index }){
    return (
        <View style={[ style.resultsViews, style.results ]}>
            <Text style={[ style.text, { fontSize: 20 } ]}>{ index + 1 }.</Text>
            <Text style={[ style.text, style.textResults ]} >{ item.response }</Text>
            <Icon name={ item.result ? 'check-circle-o' :  'times-circle' } color={ item.result ? 'green' : 'red' } size={ 22 }/>
            <Text style={[ style.text, style.textResults ]} >{ item.solution }</Text>
        </View>
    )
}

function RenderInputsOrResults(){
    const render = useSelector(state => state.testAudio.renderResults);
    if(render === 'inputs') return <CreateListInputs />
    if(render === 'results') return <Results />
}

export default function ViewTestAudio(){
    
    classTestAudio.getWords();
    useEffect(() => {
        return () => {
            classTestAudio.clearTestAudio();
        }
    })

    return (
        <View style={ style.containerTestAudio }>
            <View>
                <TextTitle text={ 'Test con audio' } typeStyle={ 'main' } />
                <Text style={ style.text }>Se te proporcionara una lista de 
                    palabras que ya has aprendido deberas escucharla y escribir que palabra es,
                    la seleccion se realiza de forma aleatorea.
                </Text>
            </View>
            <RenderInputsOrResults />
            <View>
                <FloatingButton fnPress={ () => {
                    classTestAudio.onPressBtn();
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
    },
    text: {
        textAlign: 'justify',
        color: '#fff'
    },
    textResults: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20
    },
    resultsViews: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        paddingBottom: 3
    },
    results: {
        borderColor: '#fff',
        borderBottomWidth: 1
    }
});

