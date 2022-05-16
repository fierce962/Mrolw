import React from "react";
import { Button } from 'react-native';

import { controllerNavigation } from "../models/ControllerNavigation";

export default function GoToButton() {
    return (
        <Button
            title='wordel'
            onPress={() => controllerNavigation.get().navigate('wordel') }
        />
    )
}
