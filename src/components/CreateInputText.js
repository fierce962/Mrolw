import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { TextInput, StyleSheet } from "react-native";

export default function CreateInputText({ change, reference, blurFocus }){
    const actualWord = useSelector(state => state.wordel.actualWord);
    useEffect(() => {
        reference.current.setNativeProps({ text: actualWord[0] });
    })
    let actualText = '';
    return (
        <TextInput ref={ reference } 
            style={[ style.text, style.textDisplay ]} 
            onChange={({ nativeEvent: { eventCount, target, text} }) => {
                actualText = text
            }}
            onKeyPress={ ({ nativeEvent: { key: keyValue } }) => {
                if(actualText !== '' || keyValue === 'Backspace'){
                    change({ key: keyValue, text: actualText });
                }
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
        opacity: 1
    }
});
