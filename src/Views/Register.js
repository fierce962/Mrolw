import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";


import { createInput } from "../features/MaterialInput/materialInputSlice";

import TextTitle from "../components/TextTitle";
import CreateMaterialInput from "../components/CreateMaterialInput";
import CreateButton from "../components/CreateButton";

export default function Register(){
    const dispatch = useDispatch();
    dispatch(createInput(['Nombre de usuario', 'Correo Electronico', 'clave', 'repita la clave']))
    return (
        <View style={ style.contentRegister }>
            <View></View>
            <View>
                <TextTitle text={'Registarse'} typeStyle={ 'main' } />
                <CreateMaterialInput />
            </View>
            <View style={ style.contentBtn } >
                <CreateButton title={ 'registrarse' } />
                <CreateButton title={ 'cancelar' } secudary={ true } />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    contentRegister:{
        flex: 1,
        justifyContent: 'space-between',
    },
    contentBtn: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});