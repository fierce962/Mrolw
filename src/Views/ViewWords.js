import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";


import { fnWords } from "./modelsViews/Words";

import CreateButton from "../components/CreateButton";

function Menu(){
    const menuSelect = useSelector(state => state.words.menuSelect);
    const selected = menuSelect === 0 ? [undefined, true] : [true, undefined];

    return (
        <View style={{ backgroundColor: 'red' }}>
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

function ItemList(){
    return (
        <View style={ style.contentItemList }>
            <View style={ { height: 50 } }>
                <CreateButton title={ 'Word title' } 
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

export default function ViewWords(){
    fnWords.dispatch = useDispatch();

    return (
        <View style={ { flex: 1 } }>
            <Menu />
            <ItemList />
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
        margin: 10,
    },
    contentitemTextList: {
        marginHorizontal: 2,
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: '#aaa',
        backgroundColor: '#212121',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 10
    },
    itemText: {
        color: '#fff',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5
    }
});