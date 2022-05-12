import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";

function Items({item, setFocus, index}){
    let animate = 1;
    const selectStyle = [
        style.itemText,
        item.active && style.textActive,
    ]
    const selectViewStyle = [
        style.item,
        setFocus === undefined && item.correct === 'green' && style.itemCorrect
    ]
    if(item.active){
        animate = new Animated.Value(0.1);
        Animated.loop(
            Animated.timing(animate, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false
            })
        ).start()
    }

    return (
        <TouchableOpacity onPress={ () => setFocus(index) }>
            <View style={ selectViewStyle }>
                <Animated.Text style={[ selectStyle, { opacity: animate } ]} >{ item.letters }</Animated.Text>
            </View>
        </TouchableOpacity>
    )
}

export default function CreateWordel({ index, setFocus, alternativeBackGraund }){
    const wordel = useSelector(state => state.wordel.wordel[index])
    const setStyle = [
        style.viewWordel,
        setFocus !== undefined && style.viewAbsolute,
        alternativeBackGraund && style.viewAlternative
    ]

    function LoadItems({ wordelLoad }){
        return wordel.map((item, index) => (
            <Items item={ item } index={ index } setFocus={ setFocus }/>
        ))
    }

    return (
        <View style={ setStyle }>
            <LoadItems wordelLoad={ wordel }/>
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
    },
    item: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        borderWidth: 1,
        backgroundColor: 'rgba(84, 89, 95, 0.7)',
        borderColor: 'rgb(109, 115, 122)'
    },
    itemCorrect: {
        backgroundColor: 'green',
    },
    itemText: {
        color: '#fff',
        textTransform: 'uppercase'
    },
    textActive: {
        borderRightWidth: 1,
        borderColor: 'white'
    }
});