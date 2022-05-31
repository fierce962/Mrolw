import React from "react";
import { TextInput, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { setFocus, setValueInputs } from "../features/MaterialInput/materialInputSlice";


export default function CreateMaterialInput(){
    const dispatch = useDispatch();
    const inputs = useSelector(state => state.materialInput.inputs);

    return (
        <FlatList data={ inputs }
            renderItem={({ item, index }) => {
                const styleInput = [
                    style.input,
                    inputs[index].focus && style.inputFocus
                ];

                return <TextInput style={ styleInput } 
                    onFocus={ () => dispatch(setFocus(index)) } 
                    onBlur={ () => dispatch(setFocus(index)) }
                    onChange={ ({ nativeEvent: { text } }) => {
                        dispatch(setValueInputs({
                            index: index,
                            inputValue: text
                        }));
                    } }
                    placeholder={ item.text }
                    placeholderTextColor={ '#aaa' } />
            }}/>
    )
}

const style = StyleSheet.create({
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#aaa',
        color: '#fff',
        margin: 10
    },
    inputFocus: {
        borderBottomColor: '#cc0000'
    },
});