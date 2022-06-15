import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { closeSession } from '../database/AuthDataBase';
import { clearAll } from '../models/Storage';
import { getStorage } from '../models/Storage';
import { controllerNavigation } from '../models/ControllerNavigation';
import { controllerNotifications } from '../models/ControllerNotifications';
import { clearLearn } from '../features/Learn/LearnSlice';

import Home from './home';
import Register from './Register';
import ViewWordel from '../components/ViewWordel';
import ViewPronunciation from '../components/ViewPronunciation';
import IconTouchable from '../components/IconTouchable';
import CreateError from '../components/CreateError';
import { CreateLogo } from '../components/CreateSvg';
import Login from './Login';
import ViewTestAudio from './ViewTestAudio';
import ViewWords from './ViewWords';

export default function Navigation({ drawer }){
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    controllerNavigation.set(navigation);
    
    useEffect(() => {
        getStorage('user').then(user => {
            if(user !== null){
                navigation.navigate('home');
            }
        });
    });
    
    controllerNotifications.createListener();

    return(
        <Stack.Navigator initialRouteName={ 'login' }>
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
                                fnPress={ () => { 
                                    fnPress();
                                }} /> 
                        )
                    },
                    headerRight: () => (
                        <IconTouchable iconName={ 'sign-out' } fnPress={ async () => {
                            await controllerNotifications.removeNotification('notificationId');
                            closeSession();
                            await clearAll();
                            controllerNavigation.get().reset({
                                index: 0,
                                routes: [{ name: 'login' }]
                            });
                            dispatch(clearLearn());
                        } } />
                    )
                })}>
                <Stack.Screen options={ { headerBackVisible: false } } name='home' component={ Home } />
                <Stack.Screen options={ { headerBackVisible: false } } name='wordel' component={ ViewWordel } />
                <Stack.Screen options={ { headerBackVisible: false } } name='voice' component={ ViewPronunciation } />
                <Stack.Screen options={ { headerBackVisible: false } } name='error' component={ CreateError } />
                <Stack.Screen options={ { headerBackVisible: false } } name='testAudio' component={ ViewTestAudio } />
                <Stack.Screen options={ { headerBackVisible: false } } name='words' component={ ViewWords } />
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
                <Stack.Screen name='register' component={ Register } />
            </Stack.Group>
        </Stack.Navigator>
    );
}
