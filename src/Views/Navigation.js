import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './home';
import ViewWordel from '../components/ViewWordel';
import ViewPronunciation from '../components/ViewPronunciation';
import IconTouchable from '../components/IconTouchable';
import { CreateLogo } from '../components/CreateSvg';

export default function Navigation({ drawer }){
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator>
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
                <Stack.Screen name='home' component={ Home } />
                <Stack.Screen options={ { headerBackVisible: false } } name='wordel' component={ ViewWordel } />
                <Stack.Screen options={ { headerBackVisible: false } } name='voice' component={ ViewPronunciation } />
            </Stack.Group>
        </Stack.Navigator>
    );
}
