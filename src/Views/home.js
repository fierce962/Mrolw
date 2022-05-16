import React from "react";
import { View, Text, Button, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Logo from '../img/logo.svg';

export default function Home({ navigation }) {
    return (
        <View>
            <Logo width={120} height={40} />
        </View>
    )
}