import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import { getWords } from '../features/Learn/LearnSlice';

import TextTitle from "./TextTitle";
import CreateButton from "./CreateButton";


export default function CreateBoxLearnWord(){
    const words = useSelector(state => state.learn.words);
    const dispatch = useDispatch();
    if(words === undefined){
        dispatch(getWords());
    }
    console.log(words)
    return (
        <View style={ style.contentBox }>
            <View style={ style.contentText } >
                <TextTitle text={ 'ingles' } typeStyle={ 'main' }/>
                <Text style={ style.colorText } > experimentalist </Text>
            </View>
            <View style={ style.contentText } >
                <TextTitle text={ 'español' } typeStyle={ 'main' }/>
                <Text style={ style.colorText } > experimentador </Text>
            </View>
            <View style={ style.contentButton }>
                <CreateButton title={ 'Aprendido' } size={ 18 } iconName={ 'thumbs-o-up' } />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    contentBox: {
        margin: 10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
    contentText: {
        width: '50%',
        alignItems: 'center'
    },
    colorText: {
        color: '#fff',
        fontSize: 20,
        margin: 15
    },
    contentButton: {
        width: '100%',
        margin: 1
    }
});