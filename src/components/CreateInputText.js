import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

export default function CreateInputText({ change, reference, blurFocus }){
    const [keyPress, setKeyPress] = useState([]);
    console.log('change input', keyPress)
    return (
        <TextInput ref={ reference } 
            style={[ style.text, style.textDisplay ]} 
            onKeyPress={ ({ nativeEvent: { key: keyValue } })  => {
                change(keyValue);
                let intent = [... keyPress]
                intent.push(1)
                setKeyPress(intent);
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
