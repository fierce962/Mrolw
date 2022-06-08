import React from "react";
import { View, Button } from 'react-native';

import { controllerNavigation } from "../models/ControllerNavigation";

import ProfileImg from "./ProfileImg";

export default function DrawerButton({ drawer }) {
    return (
        <View style={[ { flex: 1 }, { backgroundColor: '#202020' } ]}>
            <ProfileImg profileName={ 'fierce' } />
        </View>
    )
}
