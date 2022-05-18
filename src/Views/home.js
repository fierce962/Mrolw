import React from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { controllerNavigation } from "../models/ControllerNavigation";

import CreateBoxLearnWord from "../components/CreateBoxLearnWord";

export default function Home() {
    const navigation = useNavigation();
    controllerNavigation.set(navigation);

    return (
        <View style={ [{ padding: 10  }, { flex: 1 } ] }>
            <ScrollView>
                <CreateBoxLearnWord />
            </ScrollView>
        </View>
    )
}

