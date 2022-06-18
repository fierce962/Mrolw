import React, { useEffect, useRef } from "react";
import { View, FlatList, StyleSheet, Text, Animated } from "react-native";
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

function ItemList({ index }){
    const word = useSelector(state => state.words.wordsSelect[index]);
    const animatedUsed = useRef(null);

    const styleText = [
        style.contentitemTextList,
        word.open && { borderWidth: 2 }
    ];
    let aminatedinit = animatedUsed.current !== null ? 80 : 0;
    let animateItem = new Animated.Value(aminatedinit);
    if(word.open){
        Animated.timing(animateItem, {
            toValue: 80,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }else if (animatedUsed.current !== null){
        Animated.timing(animateItem, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }
    return (
        <View style={ style.contentItemList }>
            <View style={ { height: 50 } }>
                <CreateButton title={ `${word.id} ${word.english}` } 
                    iconName={ 'caret-down' } 
                    aditionalStyle={ { justifyContent: 'space-between' } } 
                    fnPress={ () => fnWords.changeOpenWord(index, animatedUsed, word.open) } />
            </View>
            <Animated.View style={[ styleText, { height: animateItem } ]}>
                <Text style={ style.itemText }>Español: { word.espanish }</Text>
                <Text style={ style.itemText }>{ word.pronunciationSpanish === undefined ? `Pronunciacion: No disponible` : `Pronunciacion: ${ word.pronunciationSpanish }` }</Text>
            </Animated.View>
        </View>
    )
}

function ListWords(){
    const list = useSelector(state => state.words.list);
    if(list.length === 0){
        return null
    }
    return (
        <FlatList data={ list }
            onEndReachedThreshold={ 0.2 }
            onEndReached={ () => fnWords.getWordsDb() }
            ListFooterComponent={ EndList }
            renderItem={ ({ index }) => <ItemList index={ index } /> } />
    )
}

function EndList(){
    const end = useSelector(state => state.words.end);
    return (
        <View style={ style.contentEndList }>
            <Text style={ style.itemText } >{ end ? 'No hay mas datos disponibles' : 'Buscando' }</Text>
        </View>
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
        marginBottom: 8,
        alignSelf: 'center'
    },
    contentEndList: {
        width: '100%',
        padding: 20,
        alignItems: 'center'
    },  
    contentitemTextList: {
        marginHorizontal: 2,
        borderTopWidth: 0,
        borderColor: '#aaa',
        backgroundColor: '#212121',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 10,
        overflow: 'hidden'
    },
    itemText: {
        color: '#fff',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5
    }
});