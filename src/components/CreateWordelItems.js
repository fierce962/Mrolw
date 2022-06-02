import React from "react";
import { StyleSheet, TouchableOpacity, Animated, View } from 'react-native';
import { useSelector } from "react-redux";

export default function CreateWordelItems({ setFocus, indexItem, indexWordel }){
    const item = useSelector(state => state.wordel.wordel[indexWordel][indexItem]);

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
        <TouchableOpacity onPress={ () => setFocus(indexItem) }>
            <View style={ selectViewStyle }>
                <Animated.Text style={[ selectStyle, { opacity: animate } ]} >{ item.letters }</Animated.Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    itemText: {
        color: '#fff',
        textTransform: 'uppercase'
    },
    textActive: {
        borderRightWidth: 1,
        borderColor: 'white'
    },
    itemCorrect: {
        backgroundColor: 'green',
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
    }
});