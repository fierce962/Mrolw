import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Icon from 'react-native-vector-icons/FontAwesome';

function CreateIcons({ icon, stateIcon }){
    if(icon !== undefined && icon){
        let nameIcon = 'times-circle';
        let color = 'red'
        if(stateIcon.valid !== undefined && !stateIcon.valid.result){
            nameIcon = 'check-circle';
            color = 'green'
        }
        return <Icon style={ style.icon } name={ nameIcon } size={ 20 } color={ color } />
    }
    return null
}

function CreateBoxError({ input }){
    if(input.valid === undefined || !input.valid.result) return null
    return (
        <View style={ { paddingLeft: 10 } }>
            <Text style={ { color: '#fff' } }>{ input.valid.message }</Text>
        </View>
    )
}

export default function MaterialInput({ fnRef, index, renderIcons, placeholderText, fnFocus, fnBlur, fnOnchange, extraStyle }){
    const input = useSelector(state => state.materialInput.inputs[index]);

    if(input === undefined) return null
    const styleInput = [
        style.input,
        input.focus && style.inputFocus,
        extraStyle !== undefined && extraStyle
    ];

    return (
        <View style={ style.contentInput } >
            <TextInput ref={(ref) => {
                if(fnRef !== undefined){
                    fnRef(ref);
                }
            }}
            style={ styleInput }
            onFocus={ () => {
                if(fnFocus !== undefined){
                    fnFocus();
                }
            } } 
            onBlur={ () => {
                if(fnFocus !== undefined){
                    fnBlur();
                }
            } }
            onChange={ ({ nativeEvent: { text } }) => {
                if(fnOnchange !== undefined){
                    fnOnchange(text);
                }
            } }
            placeholder={ placeholderText }
            placeholderTextColor={ '#aaa' } />
            <CreateIcons icon={ renderIcons } stateIcon={ input } />
            <CreateBoxError input={ input } />
        </View>
    )
}

const style = StyleSheet.create({
    contentInput: {
        position: 'relative',
        justifyContent: 'center'
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#aaa',
        color: '#fff',
        margin: 10,
        backgroundColor: '#202020',
        borderRadius: 3
    },
    inputFocus: {
        borderBottomColor: '#cc0000'
    },
    icon: {
        position: "absolute",
        right: 20
    }
});