import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";


import { fnWords } from "./modelsViews/Words";

import CreateButton from "../components/CreateButton";

function Menu(){
    const menuSelect = useSelector(state => state.words.menuSelect);
    const selected = menuSelect === 0 ? [undefined, true] : [true, undefined];

    return (
        <View>
            <View style={ style.menuContainer }>
                <CreateButton title={ 'Aprendidas' } 
                    secudary={ selected[0] } 
                    fnPress={() => { fnWords.changeMenuSelected(0) } } />
                <CreateButton title={ 'Por Aprender' } 
                    secudary={ selected[1] } 
                    fnPress={() => { fnWords.changeMenuSelected(1) } }/>
            </View>
        </View>
    );
}

function ItemList({ english, espanish, pronunciationSpanish }){
    console.log('list item')
    return (
        <View style={ style.contentItemList }>
            <View style={ { height: 50 } }>
                <CreateButton title={ english } 
                    iconName={ 'caret-down' } 
                    aditionalStyle={ { justifyContent: 'space-between' } } />
            </View>
            <View style={ style.contentitemTextList }>
                <Text style={ style.itemText }>En español</Text>
                <Text style={ style.itemText }>En Pronunciacion</Text>
            </View>
        </View>
    )
}

function ListWords(){
    const words = useSelector(state => state.words.wordsLearned);
    console.log('listwords', words)
    if(words.length === 0){
        return null
    }
    return (
        <FlatList data={ words }
            renderItem={ ({ item }) => <ItemList english={ item.english } 
                espanish={ item.espanish } pronunciationSpanish={ item.pronunciationSpanish } /> } />
    )
}

export default function ViewWords(){
    fnWords.dispatch = useDispatch();

    useEffect(() => {
        fnWords.getWordsDb();
    })

    return (
        <View style={ { flex: 1 } }>
            <Menu />
            <ListWords />
        </View>
    )
}

const style = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
        borderColor: '#aaa',
        borderWidth: 3,
        borderRadius: 15,
        overflow: 'hidden',
    },
    contentItemList: {
        width: '80%',
        marginBottom: 8
    },
    contentitemTextList: {
        height: 0,
        borderWidth: 0,
        marginHorizontal: 2,
        borderTopWidth: 0,
        borderColor: '#aaa',
        backgroundColor: '#212121',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 10,
    },
    itemText: {
        color: '#fff',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5
    }
});