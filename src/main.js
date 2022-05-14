import React from 'react';
import { Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ViewPronunciation from './components/ViewPronunciation';
import ViewWordel from './components/ViewWordel';
import Home from './Views/home';
import IconTouchable from './components/IconTouchable';

export default function Main() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
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
                        // headerLeft: () => (
                        //     <IconTouchable props={ { navigation, route } }/>
                        // )
                    })}>
                    <Stack.Screen name='home' component={ Home } />
                    <Stack.Screen name='wordel' component={ ViewWordel } />
                    <Stack.Screen name='voice' component={ ViewPronunciation } />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


