import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CreateButton({ title, fnPress, iconName, size }){
    function CreateIcon(){
        if(iconName !== undefined){
            return (
                <Icon style={ style.text } name={ iconName } size={ size + 2 } />
            )
        }
        return null;
    };

    return (
        <TouchableOpacity style={ style.Button } onPress={ () => fnPress() } > 
            <Text style={[style.text, { fontSize: size } ]}>
                { title }
                {' '}
                <CreateIcon />
            </Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    Button: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#313131',
    },
    text: {
        color: '#aaa',
        textTransform: 'uppercase',
        justifyContent: 'center'
    }
})