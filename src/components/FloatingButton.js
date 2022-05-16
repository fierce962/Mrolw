import React from "react";
import { View, Button, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";

export default function FloatingButton({ fnPress }){
    const parameters = useSelector(state => state.floatingBtn.parameters)
    if(parameters.view){
        return (
            <View style={ style.btn }>
                <Button title={ parameters.title } onPress={ () => fnPress() } ></Button>
            </View>
        );
    }
    return null
}

const style = StyleSheet.create({
    btn: {
        position: 'absolute',
        bottom: 5,
        right: 5
    }
});