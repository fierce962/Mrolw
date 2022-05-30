import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function TextTitle({ text, typeStyle, secundaryColor }){
    const color = [
        secundaryColor === undefined && style.color,
        secundaryColor !== undefined && style.secundaryColor
    ]
    return (
        <Text style={[ style[typeStyle], color ]} >{ text }</Text>
    )
}

const style = StyleSheet.create({
    main: {
        marginTop: 5,
        marginBottom: 7,
        textTransform: 'uppercase',
        fontSize: 25,
        textAlign: 'center'
    },
    secundary: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 19,
        textAlign: 'center'
    },
    color: {
        color: 'white'
    },
    secundaryColor: {
        color: '#aaa'
    }
})