import React from "react";
import { TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function IconTouchable({ iconName, fnPress }) {
    return (
        <TouchableHighlight onPress={ () =>{ 
            if(fnPress !== undefined){
                fnPress(); 
            }} } >
            <Text>
                <Icon name={ iconName } size={ 30 } color={ '#fff' } />;
            </Text>
        </TouchableHighlight>
    )
}
