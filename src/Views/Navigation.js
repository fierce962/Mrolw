import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { afAuth } from '../database/firebaseConfig';


import Home from './home';
import ViewWordel from '../components/ViewWordel';
import ViewPronunciation from '../components/ViewPronunciation';
import IconTouchable from '../components/IconTouchable';
import CreateError from '../components/CreateError';
import { CreateLogo } from '../components/CreateSvg';
import Login from './Login';

export default function Navigation({ drawer }){
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    useEffect(() => {
        afAuth.onAuthStateChanged((user) => {
            if(user !== null){
                navigation.navigate('home');
            }
        })
    })
    return(
        <Stack.Navigator initialRouteName='login'>
            <Stack.Group screenOptions={({ route, navigation }) => ({
                    headerTitle: () => <CreateLogo width={ 50 } height={ 50 } color={ '#cc0000' } />,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#202020'
                    },
                    contentStyle: {
                        backgroundColor: '#181818',
                        borderTopWidth: 0.6,
                        borderTopColor: '#fff'
                    },
                    headerLeft: () => {
                        const name = route.name === 'home' ? 'align-justify' : 'home';
                        const fnPress = () => route.name === 'home' ? drawer.current.openDrawer() : navigation.navigate('home')
                        return (
                            <IconTouchable iconName={ name }
                                fnPress={ fnPress } /> 
                        )
                    }
                })}>
                <Stack.Screen options={ { headerBackVisible: false } } name='home' component={ Home } />
                <Stack.Screen options={ { headerBackVisible: false } } name='wordel' component={ ViewWordel } />
                <Stack.Screen options={ { headerBackVisible: false } } name='voice' component={ ViewPronunciation } />
                <Stack.Screen options={ { headerBackVisible: false } } name='error' component={ CreateError } />
            </Stack.Group>
            <Stack.Group screenOptions={{ 
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: '#181818',
                        borderTopWidth: 0.6,
                        borderTopColor: '#fff'
                    }
                }}>
                <Stack.Screen name='login' component={ Login } />
            </Stack.Group>
        </Stack.Navigator>
    );
}
