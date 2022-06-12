import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function MaterialInput({ fnRef, focus, placeholderText, fnFocus, fnBlur, fnOnchange }){
    const styleInput = [
        style.input,
        focus !== undefined && focus && style.inputFocus
    ];

    return (
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
    )
}

const style = StyleSheet.create({
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
});