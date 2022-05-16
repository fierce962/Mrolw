import React from "react";
import { Button } from 'react-native';

import { controllerNavigation } from "../models/ControllerNavigation";

export default function DrawerButton({ drawer }) {
    return (
        <Button
            title='wordel'
            onPress={() => {
                drawer.current.closeDrawer();
                controllerNavigation.get().navigate('wordel')
            }}
        />
    )
}
