import React from "react";
import { View, Text, Button } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View>
            <Text style={ { color: '#fff' } } >home</Text>
            <Button title="test" onPress={() => navigation.navigate('wordel') }/>
        </View>
    )
}