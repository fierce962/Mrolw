import React, { useRef } from 'react';
import { DrawerLayoutAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './Views/Navigation';
import DrawerButton from './Views/DrawerButton';

export default function Main() {
    const drawerRef = useRef(null)
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
