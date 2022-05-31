import React from "react";
import { View, StyleSheet } from "react-native";

import TextTitle from "../components/TextTitle";
import CreateButton from "../components/CreateButton";
import CreateMaterialInput from "../components/CreateMaterialInput";

export default function Login(){

    return (
        <View style={ style.content }>
            <TextTitle text={ 'Iniciar Session' } typeStyle={ 'main' } secundaryColor={ 'true' } />
            <CreateMaterialInput textPlaceHolder={ 'Correo Electronico' } colorPlaceHolder={ '#aaa' } />
            <CreateMaterialInput textPlaceHolder={ 'Clave' } colorPlaceHolder={ '#aaa' } />
            <View style={ style.contentInputs } >
                <CreateButton sytle={ style.btn } title={ 'Iniciar' } />
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
    contentInputs: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
})