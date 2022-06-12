import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { store } from "../store/store";
import { createInput } from '../features/MaterialInput/materialInputSlice';
import { loginUser } from "../database/AuthDataBase";
import { setOneErrorInput } from "../features/MaterialInput/materialInputSlice";
import { validateInputs } from "./modelsViews/ValidatesInputs";
import { setState } from "../features/GeneralMessageFloating/GeneralMessageFloatingSlice";

import TextTitle from "../components/TextTitle";
import CreateButton from "../components/CreateButton";
import CreateListMaterialInput from "../components/CreateListMaterialInput";

export default function Login(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    useEffect(() => {
        navigation.addListener('focus', () => {
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
                <CreateListMaterialInput />
            </View>
            <View style={ style.contentBtn } >
                <CreateButton title={ 'Iniciar' } aditionalStyle={ style.btn }
                    fnPress={async () => {
                    dispatch(setState({
                        render: true
                    }));
                    const inputsValue = store.getState().materialInput.inputs
                    const user = await loginUser(inputsValue[0].value, inputsValue[1].value);
                    const resultValidate = validateInputs.login(user);
                    if(resultValidate.result){
                        dispatch(setOneErrorInput({
                            index: resultValidate.index,
                            valid: resultValidate
                        }));
                    }else{
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'home' }]
                        });
                    };
                    dispatch(setState({
                        render: false
                    }));
                }} />
                <CreateButton title={ 'Registrarse' } secudary={ 'true' } aditionalStyle={ style.btn }
                    fnPress={ () => {
                        navigation.navigate('register');
                    } } />
            </View>
            <CreateButton title={ 'iniciar' } iconName={ 'google' } aditionalStyle={ style.btn } />
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
    btn: {
        margin: 5,
        borderRadius: 5
    }
})