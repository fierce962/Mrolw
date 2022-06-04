import React from "react";
import { View, StyleSheet, Animated } from 'react-native';

import TextTitle from "./TextTitle";

export default function LoadingBooks({ render }){
    if(render !== undefined && !render) return null;
    const init = new Animated.Value(0);
    Animated.timing(init, {
        delay: 500,
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
    }).start();

    const initSheetBook = new Animated.Value(0);
    Animated.timing(initSheetBook, {
        delay: 1500,
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
    }).start();

    const loopSheetBook = new Animated.Value(0);
    setTimeout(() => {
        Animated.loop(
            Animated.timing(loopSheetBook, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            })
        ).start();
    }, 2000)

    return (
        <View style={ style.contentBoxLoader }>
            <View style={ style.contentBookCenter }>
                <View style={ style.contentBook }>
                    <Animated.View style={[ style.contentLateralAndCover, { 
                        transform: [{ translateX: (30 / 2) }, { translateY: (30 / 2) },
                            { rotate: init.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '-90deg']
                                }) },
                            { translateX: -1 * (30 / 2) }, {translateY: -1 * (30 / 2) }]
                        } ]}>
                        <Animated.View style={[ style.coverBook, { right: -50 },  { 
                            transform: [{ translateX:  -1 * (55 / 2) },
                                { rotate: init.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '-90deg']
                                    }) },
                                { translateX: (55 / 2) } ] 
                            } 
                            ]}>
                                
                        </Animated.View>
                        <View style={ style.coverLateral }>

                        </View>
                        <Animated.View style={ style.circle }>

                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={[ style.sheetBook, {
                        transform: [{ translateX:  -1 * (55 / 2) },
                        { rotate: initSheetBook.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '-180deg']
                            }) },
                        { translateX: (55 / 2) } ] },
                        ]}>

                    </Animated.View>
                    <Animated.View style={[ style.sheetBook, {
                        transform: [{ translateX:  -1 * (55 / 2) },
                        { rotate: loopSheetBook.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '-180deg']
                            }) },
                        { translateX: (55 / 2) } ] },
                        ]}>

                    </Animated.View>
                    <View style={ style.sheetBook }>

                    </View>
                    <View style={[ style.coverBook, { bottom: 0 } ]}>

                    </View>
                </View>
            </View>
            <TextTitle text={ 'cargando' } typeStyle={ 'main' }/>
        </View>
    )
}

const style = StyleSheet.create({
    contentBoxLoader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentBookCenter: {
        width: 130,
        height: 100,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }, 
    contentBook: {
        width: 80,
        height: 40,
        position: 'relative',
    },
    contentLateralAndCover: {
        width: 30,
        height: 40,
        position: 'absolute',
        zIndex: 100,
    },
    coverLateral: {
        width: 30,
        height: 40,
        borderColor: '#fff',
        borderWidth: 5,
        borderRightWidth: 0,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },
    coverBook: {
        width: 50,
        height: 5,
        backgroundColor: '#fff',
        position: 'absolute',
        right: 0
    },
    circle: {
        width: 35,
        height: 30,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: 'red',
        position: 'absolute',
        top: 5,
        left: 3,
        zIndex: 1000,
        backgroundColor: '#181818'
    },
    sheetBook: {
        width: 80,
        height: 3,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 7,
        right: 0
    }   
});