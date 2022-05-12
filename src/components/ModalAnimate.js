import React from "react";
import { useState } from "react";
import { Modal, Text, View, StyleSheet, Animated } from "react-native";
import CreateWordel from "./CreateWordel";

function CreateCurveAnimated({color}){
    let degEnd = 90;
    let curve = [];
    for(let i = 0; i < 3; i++){
        let init = new Animated.Value(0);
        Animated.timing(init, {
            delay: 500,
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
        curve.push(
            <Animated.View style={[ style.borderRotate, 
                { transform: [{ 
                    rotate: init.interpolate({
                        inputRange: [0, 1],
                        outputRange: [ `0deg`, `${degEnd}deg`],
                        }) 
                    }] 
                }           
                ]} >
                <View style={[ style.borderCurve, { borderColor: `${color}` } ]}>

                </View>
            </Animated.View>
        )
        degEnd += 90;
    }
    return curve;
}

function LoadCompoents({ propieties }){
    return <CreateWordel index={ propieties.index } alternativeBackGraund={ true } />
}

export default function ModalAnimate({ componentName, message, props, typeError, visible }){
    const [valueVisible, setVisible] = useState(visible)
    const icon = typeError === true ? 'close' : 'check';
    const color = typeError === true ? 'red' : 'green';
    return (
        <Modal transparent={true} animationType='fade' style={ {backgroundColor: color}}
            visible={ valueVisible } onRequestClose={() => setVisible(!valueVisible) }>
            <View style={ style.contentModal }>
                <View style={ style.viewModal } >
                    <View style={ style.contentAnimate }>
                        <View style={[ style.borderCurve, { borderColor: `${color}` } ]}>

                        </View>
                        <CreateCurveAnimated color={ color } />
                    </View>
                    <Text style={ style.message }>{ message }</Text>
                    <LoadCompoents  propieties={ props } />
                </View>
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    contentModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewModal: {
        width: '70%',
        backgroundColor: 'white',
        padding: 20,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    contentAnimate: {
        width: 100,
        height: 100,
        borderRadius: 50,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconAnimate: {
        position: 'absolute'
    },
    borderCurve: {
        width: 50,
        height: 50,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderTopStartRadius: 50,
        left: 0,
        top: 0,
        position: 'absolute',
    },
    borderRotate: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    message: {
        marginTop: 5,
        marginBottom: 5
    }
});