import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { DrawerLayoutAndroid, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { clearWordel } from './features/wordel/wordelSlice';
import { clearModal } from './features/modal/modalSlice';
import { refreshHome } from './features/Learn/LearnSlice';
import { getStorage, removeStorage } from './models/Storage';
import { controllerNotifications } from './models/ControllerNotifications';
import { controllerNavigation } from './models/ControllerNavigation';
import { listenerNetwork } from './models/networkInfo';

import Navigation from './Views/Navigation';
import DrawerButton from './components/DrawerButton';
import GeneralMessageFloating from './Views/GeneralMessageFloating';



export default function Main() {
    const dispatch = useDispatch();
    const drawerRef = useRef(null);
    const appState = useRef(AppState.currentState);
    let date = new Date().getDate();
    listenerNetwork();

    async function hasNotificationBackGraund(){
        try {
            let notification = await getStorage('notificationBack');
            if(notification !== null){
                await removeStorage('notificationBack');
                controllerNavigation.get().reset({
                    index: 0,
                    routes: [{ name: 'home' }]
                });
                if(notification.pressAction.id === 'open-wordel'){
                    dispatch(clearWordel());
                    dispatch(clearModal());
                };
                controllerNotifications.actionsPress(notification.data, 
                    notification.pressAction.id);
            }
        } catch (error) {
            console.log('error has notification', error)
        }
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nexState => {
            if(nexState === 'active'){
                hasNotificationBackGraund();
                const actualDate = new Date().getDate()
                if(date !== actualDate){
                    dispatch(refreshHome());
                    date = actualDate;
                }
            }
        });
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View style={[ { position: 'relative' }, { flex: 1 } ]}>
            <NavigationContainer>
                <DrawerLayoutAndroid
                    ref={ drawerRef }
                    drawerWidth={ 300 }
                    renderNavigationView={() => <DrawerButton drawer={ drawerRef }/> } >
                        <Navigation drawer={ drawerRef }/>
                </DrawerLayoutAndroid>
            </NavigationContainer>
            <GeneralMessageFloating />
        </View>
    );
}
