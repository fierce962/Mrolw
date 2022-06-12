import React from "react";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";

import { store } from "../store/store";

import { setFocus, setValueInputs } from "../features/MaterialInput/materialInputSlice";

import MaterialInput from "./MaterialInput";



export default function CreateListMaterialInput({ renderItems, renderIcons, fnValidate, contentReference }){
    const dispatch = useDispatch();

    return (
        <FlatList data={ renderItems }
            renderItem={({ item, index }) => {
                return (
                    <MaterialInput fnRef={ (ref) => {
                        if(contentReference !== undefined && 
                            contentReference[index] === undefined){
                            contentReference.push(ref);
                        }
                    }} 
                    renderIcons={ renderIcons }
                    fnFocus={ () => dispatch(setFocus(index)) } 
                    fnBlur={ () => dispatch(setFocus(index)) } 
                    fnOnchange={ (text) => {
                        let validate = undefined;
                        const inputs = store.getState().materialInput.inputs;
                        if(fnValidate !== undefined){
                            validate = fnValidate(text, inputs, index);
                        };
                        dispatch(setValueInputs({
                            index: index,
                            inputValue: text,
                            valid: validate
                        }));
                    } } 
                    placeholderText={ item } index={ index } />
                )
            }}/>
    )
};