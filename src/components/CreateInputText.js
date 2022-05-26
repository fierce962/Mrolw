import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function CreateInputText({ change, reference, blurFocus }){
    let actualText = '';
    return (
        <TextInput ref={ reference } 
            style={[ style.text, style.textDisplay ]} 
            onChange={({ nativeEvent: { eventCount, target, text} }) => {
                actualText = text
            }}
            onKeyPress={ ({ nativeEvent: { key: keyValue } }) => {
                change({ key: keyValue, text: actualText });
            }}
            onBlur={ () => blurFocus() }
            autoFocus={ true } />
    )
}

const style = StyleSheet.create({
    text: {
        backgroundColor: 'white'
    },
    textDisplay: {
        opacity: 0
    }
});
