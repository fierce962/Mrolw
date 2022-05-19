import React from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import { getWords, setLearnWord } from '../features/Learn/LearnSlice';

import TextTitle from "./TextTitle";
import CreateButton from "./CreateButton";

function LearnText({ textTitle, text }){
    return (
        <View style={ style.contentText } >
            <TextTitle text={ textTitle } typeStyle={ 'main' }/>
            <Text style={ style.colorText } > { text } </Text>
        </View>
    )
}

export default function CreateBoxLearnWord({ viewRender }){
    if(viewRender){
        const words = useSelector(state => state.learn.words);
        const dispatch = useDispatch();
        if(words === undefined){
            dispatch(getWords());
        }
        if(words !== undefined && words !== null){
            return (
                <FlatList data={ words.list }
                    renderItem={ ({ item }) => (
                        <View style={ style.contentBox }>
                            <LearnText textTitle={ 'english' } text={ item.english } />
                            <LearnText textTitle={ 'español' } text={ item.espanish } />
                            <View style={ style.contentButton }>
                                <CreateButton title={ 'Aprendido' } 
                                    fnPress={ () => dispatch(setLearnWord(0)) }
                                    size={ 18 } iconName={ 'thumbs-o-up' } 
                                    />
                            </View>
                        </View>
                    ) }/>
            );
        }
    }
    return null
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