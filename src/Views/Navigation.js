import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './home';
import ViewWordel from '../components/ViewWordel';
import ViewPronunciation from '../components/ViewPronunciation';
import IconTouchable from '../components/IconTouchable';

export default function Navigation(){
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Group screenOptions={({ navigation, route }) => ({
                    headerTitle: 'MrOwl',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#181818'
                    },
                    headerTitleStyle: {
                        color: '#fff'
                    },
                    contentStyle: {
                        backgroundColor: '#181818',
                        borderTopWidth: 0.6,
                        borderTopColor: '#fff'
                    },
                    headerLeft: () => (
                        <IconTouchable props={ { navigation, route } } />
                    )
                })}>
                <Stack.Screen name='home' component={ Home } />
                <Stack.Screen name='wordel' component={ ViewWordel } />
                <Stack.Screen name='voice' component={ ViewPronunciation } />
            </Stack.Group>
        </Stack.Navigator>
    );
}
