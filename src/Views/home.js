import React from "react";
import { View, Text, Button, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { controllerNavigation } from "../models/ControllerNavigation";

export default function Home() {
    const navigation = useNavigation();
    controllerNavigation.set(navigation);
    return (
        <View>
            
        </View>
    )
}