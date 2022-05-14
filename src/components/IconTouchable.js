import React from "react";
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


function createIconParameters(props){
    if(props.navigation !== undefined && props.route.name === 'home'){
        return {
            iconName: 'align-justify',
            fnPress: props.navigation.openDrawer()
        }
    }else{
        return {
            iconName: 'home',
            fnPress: props.navigation.navigate(route)
        }
    };
}

export default function IconTouchable({ props }) {
    const toucheProps = createIconParameters(props);
    return (
        <TouchableHighlight onPress={ () => toucheProps.fnPress }>
            <Icon name={ toucheProps.iconName } size={ 30 } color={ '#fff' } />;
        </TouchableHighlight>
    )
}
