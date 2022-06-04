import React from "react";
import { View, StyleSheet } from 'react-native';

import FloatingMessage from "../components/FloatingMessage";

export default function GeneralMessageFloating(){
    return (
        <View style={ style.contentMessage }>
            <FloatingMessage message={ 'hola' } topSpacing={ 0 } notTiangle={ true }/>
        </View>
    )
}

const style = StyleSheet.create({
    contentMessage: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        zIndex: 1500,
    }
})