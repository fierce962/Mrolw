import React from "react";
import { View, StyleSheet } from 'react-native';

import { controllerNavigation } from "../models/ControllerNavigation";

import ProfileImg from "./ProfileImg";
import CreateButton from '../components/CreateButton';

export default function DrawerButton({ drawer }) {
    return (
        <View style={[ { flex: 1 }, { backgroundColor: '#202020' } ]}>
            <ProfileImg />
            {/* <CreateButton title={ 'Perfil' } aditionalStyle={ style.changeBtnStyle } />
            <CreateButton title={ 'Oraciones' } aditionalStyle={ style.changeBtnStyle } /> */}
            <CreateButton title={ 'Palabras' } aditionalStyle={ style.changeBtnStyle } 
            fnPress={() => {
                controllerNavigation.get().navigate('words');
                drawer.current.closeDrawer();
            }} />
            <CreateButton title={ 'Prueba con audio' } aditionalStyle={ style.changeBtnStyle } 
                fnPress={() => {
                    controllerNavigation.get().navigate('testAudio');
                    drawer.current.closeDrawer();
                }} />
        </View>
    )
}

const style = StyleSheet.create({
    changeBtnStyle: {
        marginTop: 5
    }
});