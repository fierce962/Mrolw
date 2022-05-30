import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import CreateWordelItems from "./CreateWordelItems";

export default function CreateWordel({ index, setFocus, alternativeBackGraund, wordelText }){
    const setStyle = [
        style.viewWordel,
        setFocus !== undefined && style.viewAbsolute,
        alternativeBackGraund && style.viewAlternative
    ]

    function LoadItems(){
        console.log(wordelText)
        return wordelText.split('').map((value, i) => (
            <CreateWordelItems key={ `items${index}-${i}` } indexItem={ i } indexWordel={ index } setFocus={ setFocus } />
        ))
    }

    return (
        <View style={ setStyle }>
            <LoadItems />
        </View>
    )
}

const style = StyleSheet.create({
    viewWordel: {
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
        flexDirection: 'row',
        zIndex: 1
    },
    viewAlternative: {
        backgroundColor: 'white'
    },
    viewAbsolute: {
        position: 'absolute'
    }
});