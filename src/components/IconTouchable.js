import React from "react";
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function IconTouchable({ iconName, fnPress, sizeIcon }) {
    sizeIcon = sizeIcon === undefined ? 30 : sizeIcon;
    return (
        <TouchableHighlight style={ style.icon } onPress={ () =>{ 
            if(fnPress !== undefined){
                fnPress(); 
            }} } >
            <Text>
                <Icon name={ iconName } size={ sizeIcon } color={ '#fff' } />;
            </Text>
        </TouchableHighlight>
    )
}

const style = StyleSheet.create({
    icon: {
        padding: 5
    }
})
