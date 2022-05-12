import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function CreateInputText({ change, reference, blurFocus }){
    return (
        <TextInput ref={ reference } 
            style={[ style.text, style.textDisplay ]} 
            onKeyPress={ ({ nativeEvent: { key: keyValue } })  => change(keyValue) }
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
