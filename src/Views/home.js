import React from "react";
import { View, StyleSheet, } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { controllerNavigation } from "../models/ControllerNavigation";
import { useSelector } from "react-redux";

import CreateBoxLearnWord from "../components/CreateBoxLearnWord";
import CreateBoxInformative from "../components/CreateBoxInformative";

export default function Home() {
    const mode = useSelector(state => state.learn.mode);
    const navigation = useNavigation();
    controllerNavigation.set(navigation);
    return (
        <View style={ [{ padding: 10  }, { flex: 1 } ] }>
            <CreateBoxLearnWord viewRender={ mode === 'learnMode' ? true : false } />
            {/* <CreateBoxInformative /> */}
        </View>
    )
}

