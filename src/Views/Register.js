import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { createInput } from "../features/MaterialInput/materialInputSlice";

import TextTitle from "../components/TextTitle";
import CreateMaterialInput from "../components/CreateMaterialInput";
import CreateButton from "../components/CreateButton";

function validate(textInput, Allinputs, index){
    const validateResult = {
        message: '',
        result: false,
    }
    if('Correo Electronico' === Allinputs[index].textHolder){
        const evaluateRegex = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);
        if(evaluateRegex.test(textInput)){
            validateResult.result = true;
        }else{
            validateResult.message = 'El correo no es valido';
        }
    }else if('Nombre de Usuario' === Allinputs[index].textHolder){
        if(textInput === ''){
            validateResult.message = 'El nombre de usuario no puede estar vacio';
        }else if(textInput.length < 6){
            validateResult.message = 'El nombre de usuario debe ser de minimo 6 caracteres';
        }else{
            validateResult.result = true;
        }
    }else if('Clave' === Allinputs[index].textHolder){
        if(textInput === ''){
            validateResult.message = 'La clave no puede estar vacia';
        }else if(textInput.length < 6){
            validateResult.message = 'La clave debe ser de minimo 6 caracteres';
        }else{
            validateResult.result = true;
        }
    }else if('Confirme la clave' === Allinputs[index].textHolder){
        console.log('clave 1', Allinputs[index - 1].value, 'clave 2', Allinputs[index].value)
        if(textInput === ''){
            validateResult.message = 'La clave no puede estar vacia';
        }else if(textInput.length < 6){
            validateResult.message = 'La clave debe ser de minimo 6 caracteres';
        }else if(Allinputs[index - 1].value !== textInput){
            validateResult.message = 'Las claves no coinciden';
        }else{
            validateResult.result = true;
        }
    }
    return validateResult;
}

export default function Register(){
    const dispatch = useDispatch();
    dispatch(createInput(['Nombre de Usuario', 'Correo Electronico', 'Clave', 'Confirme la clave']));
    return (
        <View style={ style.contentRegister }>
            <View></View>
            <View>
                <TextTitle text={'Registarse'} typeStyle={ 'main' } />
                <CreateMaterialInput renderIcons={ true } fnValidate={ validate }/>
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