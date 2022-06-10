import React, { useState } from "react";
import { Animated, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function VoiceIconAnimated({ fnPressIn, fnPressOut }){
    const [press, setPress] = useState(false);

    const animateInit = new Animated.Value(50);
    if(press){
        Animated.loop(
            Animated.timing(animateInit, {
                toValue: 100,
                duration: 1000,
                useNativeDriver: false
            })
        ).start();
    }


    const styleAnimate = [
        style.tolgleAnimate,
        press && { width: animateInit }, 
        press && { height: animateInit },  
        { borderRadius: animateInit } 
    ];

    return(
        <Animated.View style={ styleAnimate }>
            <TouchableHighlight style={ style.buttonIcon }
                onPressIn={ () => {
                    setPress(true);
                    fnPressIn();
                } } 
                onPressOut={() => {
                    setPress(false);
                    fnPressOut();
                }} >
                <Text>
                    <Icon name="microphone" size={ 30 } color={ press === false ? '#000' : 'red' } />
                </Text>
            </TouchableHighlight>
        </Animated.View>
    )
}

const style = StyleSheet.create({
    tolgleAnimate: {
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonIcon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
});