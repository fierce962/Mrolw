import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

import TextTitle from "./TextTitle";
import CreateButton from "./CreateButton";

export default function CreateError({ route }){
    const { title, subTitle, nameIcon, textBtn, routeName } = route.params;
    const navigation = useNavigation();

    return (
        <View style={ style.contentError }>
            <View style={ style.contentText }>
                <Text>
                    <Icon name="exclamation-triangle" size={ 30 } color={ '#cc0000' } />
                </Text>
                <TextTitle text={ title } typeStyle={ 'main' }/>
                <TextTitle text={ subTitle } typeStyle={ 'secundary' } secundaryColor={ true }/>
            </View>
            <View style={ style.contentbtn }>
                <CreateButton title={ textBtn } fnPress={ () => {
                        navigation.navigate(routeName); 
                    } } 
                    iconName={ nameIcon }/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    contentError: {
        flex: 1,
        alignItems: 'center'
    },
    contentText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentbtn: {
        width: '80%',
        margin: 10
    }
})