import React from 'react';
import { Button, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import ViewPronunciation from './components/ViewPronunciation';
import ViewWordel from './components/ViewWordel';
import Home from './Views/home';
import IconTouchable from './components/IconTouchable';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
            onPress={() => navigation.navigate('Notifications')}
            title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function Main() {
    const Stack = createNativeStackNavigator();

    // return (
    // <NavigationContainer>
    //     <Drawer.Navigator initialRouteName="Home">
    //         <Drawer.Screen name="Home" component={HomeScreen} />
    //         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    //     </Drawer.Navigator>
    // </NavigationContainer>
    // );
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
