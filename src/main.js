import React from 'react';
import { Button, DrawerLayoutAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './Views/Navigation';
import DrawerButton from './Views/DrawerButton';

export default function Main() {
    return (
        <NavigationContainer >
            <DrawerLayoutAndroid
                    drawerWidth={300}
                    renderNavigationView={() => DrawerButton() }>
                        <Navigation />
            </DrawerLayoutAndroid>
        </NavigationContainer>
    );
}
