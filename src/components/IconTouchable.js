import React from "react";
import { TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { controllerNavigation } from '../models/ControllerNavigation';

function createIconParameters(props){
    if(props.navigation !== undefined && props.route.name === 'home'){
        return {
            iconName: 'align-justify',
            fnPress: () => props.drawer.current.openDrawer()
        }
    }else{
        return {
            iconName: 'home',
            fnPress: () => props.navigation.navigate('home')
        }
    };
}

export default function IconTouchable({ props }) {
    const toucheProps = createIconParameters(props);
    controllerNavigation.set(props.navigation);

    return (
        <TouchableHighlight onPress={ () => toucheProps.fnPress()  }>
            <Text>
                <Icon name={ toucheProps.iconName } size={ 30 } color={ '#fff' } />;
            </Text>
        </TouchableHighlight>
    )
}
