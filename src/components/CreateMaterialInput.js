import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";


export default function CreateMaterialInput({ textPlaceHolder, colorPlaceHolder }){
    const [inputFocus, setFocus] = useState(false);
    const styleInput = [
        style.input,
        inputFocus && style.inputFocus
    ];

    return (
        <TextInput style={ styleInput } 
            onFocus={ () => setFocus(true) } 
            onBlur={ () => setFocus(false) }
            placeholder={ textPlaceHolder }
            placeholderTextColor={ colorPlaceHolder } />
    )
}

const style = {
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#aaa',
        color: '#fff',
        margin: 10
    },
    inputFocus: {
        borderBottomColor: '#cc0000'
    },
}