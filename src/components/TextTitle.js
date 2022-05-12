import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function TextTitle({ text, typeStyle }){
    return (
        <Text style={[ style[typeStyle], style.color ]} >{ text }</Text>
    )
}

const style = StyleSheet.create({
    main: {
        marginTop: 5,
        marginBottom: 7,
        textTransform: 'uppercase',
        fontSize: 25
    },
    secundary: {
        marginTop: 5,
        marginBottom: 10,
    },
    color: {
        color: 'white'
    }
})