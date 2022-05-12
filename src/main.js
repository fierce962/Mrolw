import React from 'react';
import { StyleSheet, View } from 'react-native';
import ViewPronunciation from './components/ViewPronunciation';

export default function Main() {
    return (
        <View style={ style.body }>
            <View style={ style.menu }>

            </View>
            <View style={ style.content } >
                <ViewPronunciation />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#181818'
    },
    menu: {
        height: 50,
        backgroundColor: 'blue'
    },
    content: {
        flex: 1
    }
})

