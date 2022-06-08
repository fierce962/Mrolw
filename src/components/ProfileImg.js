import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";

import { getStorage } from '../models/Storage';

import TextTitle from "./TextTitle";


export default function ProfileImg(){
    const [userName, setName] = useState('');

    useEffect(() => {
        getStorage('user').then(userStorage => {
            setName(userStorage.userName);
        });
    });

    return (
        <View style={ style.contentImg }>
            <Image style={ style.img } source={ require('../img/no-imagen.jpg') } />
            <TextTitle text={ userName } typeStyle={ 'main' } secundaryColor={ true } />
        </View>
    )
}

const style = StyleSheet.create({
    contentImg: {
        alignItems: 'center',
        padding: 20,
        borderBottomColor: '#303030',
        borderBottomWidth: 1
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 75,
    }
});