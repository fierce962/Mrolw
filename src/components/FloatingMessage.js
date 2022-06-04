import React from "react";
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function FloatingMessage({ message, topSpacing }){
    let animateValue = new Animated.Value(0);
    Animated.timing(animateValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
    }).start();
    return (
        <Animated.View style={[ 
            style.contentFloting,
            { top: topSpacing }, 
            { height: animateValue.interpolate({
                inputRange: [0, 1],
                outputRange: [ 0, 40]})}, 
            { padding: animateValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 10]
            }) }]}>
            <View style={ style.triangle } ></View>
            <Text style={ style.text }>{ message }</Text>
        </Animated.View>
    )
}

const style = StyleSheet.create({
    contentFloting: {
        position: 'absolute',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 15
    },
    triangle: {
        width: 10,
        height: 10,
        backgroundColor: '#fff',
        position: 'absolute',
        transform: [{ rotate: '45deg' }],
        top: -5,
        zIndex: 30
    },
    text: {
        color: '#000',
        fontSize: 16
    }
})
