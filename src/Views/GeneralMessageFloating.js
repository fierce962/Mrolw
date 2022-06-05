import React from "react";
import { View, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";

import FloatingMessage from "../components/FloatingMessage";

export default function GeneralMessageFloating(){
    const render = useSelector(state => state.generalMessage.render);
    const menssage = useSelector(state => state.generalMessage.menssage);

    if(!render) return null;
    
    return (
        <View style={ style.contentGeneral }>
            <View style={ style.contentMessage }>
                <FloatingMessage message={ 'Espere por favor procesando' } topSpacing={ 0 } notTiangle={ true }/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    contentGeneral: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        justifyContent: 'flex-end',
        zIndex: 1500,
    },
    contentMessage: {
        width: '100%',
        height: 80,
        alignItems: 'center',
    }
})