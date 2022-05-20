import React, { useEffect } from "react";
import { View, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { controllerNavigation } from "../models/ControllerNavigation";
import { useSelector } from "react-redux";

import CreateBoxLearnWord from "../components/CreateBoxLearnWord";
import CreateBoxInformative from "../components/CreateBoxInformative";

import { controllerNotifications } from "../models/ControllerNotifications";

import { removeStorage } from '../models/Storage';

export default function Home() {
    const mode = useSelector(state => state.learn.mode);
    const navigation = useNavigation();
    controllerNavigation.set(navigation);

    useEffect(() => {
        controllerNotifications.createListener();
    })

    return (
        <View style={ [{ padding: 10  }, { flex: 1 } ] }>
            <Button title="create notification" onPress={() => controllerNotifications.createNotification() }/>
            <Button title="remove" onPress={() => removeStorage() }/>
            {/* <CreateBoxLearnWord viewRender={ mode === 'learnMode' ? true : false } />
            <CreateBoxInformative viewRender={ mode === 'testMode' ? true : false }/> */}
        </View>
    )
}

