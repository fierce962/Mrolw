import React from "react";
import { Modal, Text, View, StyleSheet, Animated, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from "react-redux";
import { setChangeVisible } from '../features/modal/modalSlice';

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
            <Animated.View key={ `${curve}i` } style={[ style.borderRotate, 
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

export default function ModalAnimate(){
    const modalValue = useSelector(state => state.modal.values);
    const dispatch = useDispatch();
    
    const iconName = modalValue.type === 'close' ? 'close' : 'check';
    const color = modalValue.type === 'close' ? 'red' : 'green';
    const message = modalValue.message;
    const valueVisible = modalValue.visibleView;

    return (
        <Modal pointerEvents="none" transparent={ true } animationType='fade' style={ {backgroundColor: color}}
                visible={ valueVisible }>
                <TouchableWithoutFeedback onPress={() => dispatch(setChangeVisible()) }>
                    <View style={ style.contentModal } >
                        <View style={ style.viewModal } >
                            <View style={ style.contentAnimate }>
                                <View style={[ style.borderCurve, { borderColor: `${color}` } ]}>

                                </View>
                                <Text style={ style.iconAnimate }>
                                    <Icon name={ iconName } size={ 30 } color={ color } />;
                                </Text>
                                <CreateCurveAnimated color={ color } />
                            </View>
                            <Text style={ style.message }>{ message }</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
}

const style = StyleSheet.create({
    contentModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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