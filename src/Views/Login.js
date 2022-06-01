import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { store } from "../store/store";
import { createInput } from '../features/MaterialInput/materialInputSlice';
import { loginUser } from "../database/AuthDataBase";


import TextTitle from "../components/TextTitle";
import CreateButton from "../components/CreateButton";
import CreateMaterialInput from "../components/CreateMaterialInput";
import { afAuth } from "../database/firebaseConfig";

export default function Login(){
    const dispatch = useDispatch();
    dispatch(createInput(['Correo Electronico', 'Clave']));

    return (
        <View style={ style.content }>
            <TextTitle text={ 'Iniciar Session' } typeStyle={ 'main' } secundaryColor={ 'true' } />
            <View>
                <CreateMaterialInput />
            </View>
            <View style={ style.contentBtn } >
                <CreateButton sytle={ style.btn } title={ 'Iniciar' } fnPress={async () => {
                    const inputsValue = store.getState().materialInput.inputs
                    await loginUser(inputsValue[0].value, inputsValue[1].value);
                    console.log('value afauth', afAuth)
                }} />
                <CreateButton sytle={ style.btn } title={ 'Registrarse' } secudary={ 'true' } />
            </View>
            <CreateButton sytle={ style.btn } title={ 'iniciar' } iconName={ 'google' } />
        </View>
    )
}

const style = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    contentBtn: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
})