import React from "react";
import { TextInput, StyleSheet, FlatList, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Icon from 'react-native-vector-icons/FontAwesome';
import { setFocus, setValueInputs } from "../features/MaterialInput/materialInputSlice";

function CreateIcons({ icon, stateIcon }){
    if(icon !== undefined && icon){
        let nameIcon = 'times-circle';
        let color = 'red'
        if(stateIcon.valid !== undefined && !stateIcon.valid.result){
            nameIcon = 'check-circle';
            color = 'green'
        }
        return <Icon style={ style.icon } name={ nameIcon } size={ 20 } color={ color } />
    }
    return null
}

function CreateBoxError({ input }){
    if(input.valid === undefined || !input.valid.result) return null
    return (
        <View style={ { paddingLeft: 10 } }>
            <Text style={ { color: '#fff' } }>{ input.valid.message }</Text>
        </View>
    )
}

export default function CreateListMaterialInput({ renderIcons, fnValidate, contentReference }){
    const dispatch = useDispatch();
    const inputs = useSelector(state => state.materialInput.inputs);

    return (
        <FlatList data={ inputs }
            renderItem={({ item, index }) => {
                const styleInput = [
                    style.input,
                    inputs[index].focus && style.inputFocus
                ];

                return (
                    <View style={ style.contentInput } >
                        <TextInput ref={(ref) => {
                                if(contentReference !== undefined && 
                                    contentReference[index] === undefined){
                                    contentReference.push(ref);
                                }
                            }}
                            style={ styleInput }
                            onFocus={ () => dispatch(setFocus(index)) } 
                            onBlur={ () => dispatch(setFocus(index)) }
                            onChange={ ({ nativeEvent: { text } }) => {
                                let validate = undefined;
                                if(fnValidate !== undefined){
                                    validate = fnValidate(text, inputs, index);
                                };
                                dispatch(setValueInputs({
                                    index: index,
                                    inputValue: text,
                                    valid: validate
                                }));
                            } }
                            placeholder={ item.textHolder }
                            placeholderTextColor={ '#aaa' } />
                        <CreateIcons icon={ renderIcons } stateIcon={ item } />
                        <CreateBoxError input={ item } />
                    </View>
                )
            }}/>
    )
}

const style = StyleSheet.create({
    contentInput: {
        position: 'relative',
        justifyContent: 'center'
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#aaa',
        color: '#fff',
        margin: 10,
        backgroundColor: '#202020',
        borderRadius: 3
    },
    inputFocus: {
        borderBottomColor: '#cc0000'
    },
    icon: {
        position: "absolute",
        right: 20
    }
});