import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CreateButton({ title, fnPress, iconName, size, secudary, aditionalStyle }){
    if(size === undefined) size = 20;

    const btn = [
        style.Button,
        secudary !== undefined && style.secundaryBtn,
        aditionalStyle !== undefined && aditionalStyle,
    ];

    function CreateIcon(){
        if(iconName !== undefined){
            return (
                <Icon style={ style.text } name={ iconName } size={ size + 2 } />
            )
        }
        return null;
    };

    return (
        <TouchableOpacity style={ btn } onPress={ () => fnPress() } > 
            <Text style={[style.text, { fontSize: size } ]}>
                { title }
                {' '}
            </Text>
            <CreateIcon />
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    Button: {
        flex: 1,
        maxHeight: 50,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#313131',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    secundaryBtn: {
        backgroundColor: '#202020'
    },
    text: {
        color: '#aaa',
        textTransform: 'uppercase',
        justifyContent: 'center'
    }
})