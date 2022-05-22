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

    const information = {
        title: 'Termino el modo estudio',
        subtitle: 'Modo de pruebas',
        message: 'llegara una notificacion informando cuando puedas entrar al modo pruebas, en el cual tendras que traducir de español a ingles una de las palabras aprendiste hoy.'
    }
    console.log(mode)
    useEffect(() => {
        controllerNotifications.createListener();
    })
    if(mode === 'finishMode'){
        information.title = 'termino';
        information.subtitle = 'termino';
        information.message = 'termino';
    }

    return (
        <View style={ [{ padding: 10  }, { flex: 1 } ] }>
            <Button title="create notification" onPress={() => controllerNotifications.createNotification('test', 'test', {"english": "react", "espanish": "reaccionar", "pronunciation": "rēakt", "pronunciationSpanish": "riakt"}, 60000) }/>
            <Button title="remove" onPress={() => removeStorage() }/>
            <CreateBoxLearnWord viewRender={ mode === 'learnMode' ? true : false } />
            <CreateBoxInformative viewRender={ mode === 'testMode' || 'finishMode' ? true : false }
                title={ information.title } subtitle={ information.subtitle } 
                message={ information.message } />
        </View>
    )
}

