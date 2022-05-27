import React, { useRef, useState, useEffect } from 'react';
import { DrawerLayoutAndroid, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { clearWordel } from './features/wordel/wordelSlice';
import { getStorage, removeStorage } from './models/Storage';
import { controllerNotifications } from './models/ControllerNotifications';

import Navigation from './Views/Navigation';
import DrawerButton from './components/DrawerButton';

export default function Main() {
    const dispatch = useDispatch();
    const drawerRef = useRef(null);
    const appState = useRef(AppState.currentState);

    async function hasNotificationBackGraund(){
        try {
            let notification = await getStorage('notificationBack');
            console.log('mainnotification', notification);
            if(notification !== null){
                await removeStorage('notificationBack');
                if(notification.pressAction.id === 'open-wordel'){
                    dispatch(clearWordel());
                }
                controllerNotifications.actionsPress(notification.data, notification.pressAction.id);
            }
        } catch (error) {
            console.log('error has notification', error)
        }
    }

    useEffect(() => {
        controllerNotifications.createListener();
        const subscription = AppState.addEventListener('change', nexState => {
            if(nexState === 'active'){
                hasNotificationBackGraund();
            }
        });
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <NavigationContainer >
            <DrawerLayoutAndroid
                ref={ drawerRef }
                drawerWidth={300}
                renderNavigationView={() => <DrawerButton drawer={ drawerRef }/> }>
                    <Navigation drawer={ drawerRef }/>
            </DrawerLayoutAndroid>
        </NavigationContainer>
    );
}
