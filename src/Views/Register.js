import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { store } from '../store/store';
import { createInput, setValueInputs } from "../features/MaterialInput/materialInputSlice";
import { createUser } from "../database/AuthDataBase";
import { useNavigation } from "@react-navigation/native";
import { validateInputs } from "./modelsViews/ValidatesInputs";

import TextTitle from "../components/TextTitle";
import CreateMaterialInput from "../components/CreateMaterialInput";
import CreateButton from "../components/CreateButton";


export default function Register(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    dispatch(createInput(['Nombre de Usuario', 'Correo Electronico', 'Clave', 'Confirme la clave']));
    const contentReference = [];

    function validate(text, inputs, index){
        return validateInputs.register(text, inputs, index)
    }

    return (
        <View style={ style.contentRegister }>
            <View></View>
            <View>
                <TextTitle text={'Registarse'} typeStyle={ 'main' } />
                <CreateMaterialInput renderIcons={ true } fnValidate={ validate } 
                    contentReference={ contentReference }  />
            </View>
            <View style={ style.contentBtn } >
                <CreateButton title={ 'registrarse' } aditionalStyle={ style.btn }
                    fnPress={async () => {
                    const inputsValues = store.getState().materialInput.inputs;
                    let inputError;
                    const send = inputsValues.every((value, index) => {
                        if(value.valid !== undefined && !value.valid.result){
                            return true;
                        }
                        if(inputError === undefined) inputError = [value.value, index];
                        return false;
                    });
                    if(send){
                        const resultCreate = await createUser(inputsValues[0].value, inputsValues[1].value, inputsValues[2].value);
                        if(resultCreate === 'email-duplicate'){
                            dispatch(setValueInputs({
                                index: 1,
                                valid: {
                                    message: 'Este correo se encuentra esta registrado',
                                    result: true,
                                }
                            }));
                            contentReference[1].focus();
                        }else{
                            navigation.navigate('login');
                        };
                    }else{
                        console.log('input error', inputError[0], inputError[1])
                        dispatch(setValueInputs({
                            index: inputError[1],
                            valid: validate(inputError[0], inputsValues, inputError[1])
                        }));
                        contentReference[inputError[1]].focus();
                    }
                }} />
                <CreateButton title={ 'cancelar' } aditionalStyle={ style.btn } 
                    secudary={ true } fnPress={() => {
                        navigation.navigate('login');
                    }} />
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
    },
    btn: {
        margin: 5
    }
});