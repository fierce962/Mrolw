import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { store } from "../store/store";
import { createInput } from '../features/MaterialInput/materialInputSlice';
import { loginUser } from "../database/AuthDataBase";
import { setOneErrorInput } from "../features/MaterialInput/materialInputSlice";
import { validateInputs } from "./modelsViews/ValidatesInputs";

import TextTitle from "../components/TextTitle";
import CreateButton from "../components/CreateButton";
import CreateMaterialInput from "../components/CreateMaterialInput";

export default function Login(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('create focus')
            dispatch(createInput(['Correo Electronico', 'Clave']));
        });
        return () => {
            navigation.removeListener();
        } 
    });

    return (
        <View style={ style.content }>
            <TextTitle text={ 'Iniciar Session' } typeStyle={ 'main' } secundaryColor={ 'true' } />
            <View>
                <CreateMaterialInput />
            </View>
            <View style={ style.contentBtn } >
                <CreateButton sytle={ style.btn } title={ 'Iniciar' } fnPress={async () => {
                    const inputsValue = store.getState().materialInput.inputs
                    const user = await loginUser(inputsValue[0].value, inputsValue[1].value);
                    const resultValidate = validateInputs.login(user);
                    if(resultValidate.result){
                        dispatch(setOneErrorInput({
                            index: resultValidate.index,
                            valid: resultValidate
                        }));
                    };
                }} />
                <CreateButton sytle={ style.btn } title={ 'Registrarse' } secudary={ 'true' } 
                    fnPress={ () => {
                        navigation.navigate('register');
                    } } />
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