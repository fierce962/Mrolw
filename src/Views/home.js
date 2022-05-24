import React, { useEffect } from "react";
import { View, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { controllerNavigation } from "../models/ControllerNavigation";
import { useSelector, useDispatch } from "react-redux";

import CreateBoxLearnWord from "../components/CreateBoxLearnWord";
import CreateBoxInformative from "../components/CreateBoxInformative";
import CreateTimerCount from "../components/CreateTimerCount";

import { controllerNotifications } from "../models/ControllerNotifications";
import { removeStorage, getStorage } from '../models/Storage';
import { clearWordel } from "../features/wordel/wordelSlice";

import { calcTime } from "../features/timerCount/timerCountSlice";

export default function Home() {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.learn.mode);
    const navigation = useNavigation();
    controllerNavigation.set(navigation);

    const information = {
        title: 'Termino el modo estudio',
        subtitle: 'Modo de pruebas',
        message: 'llegara una notificacion informando cuando puedas entrar al modo pruebas, en el cual tendras que traducir de español a ingles una de las palabras aprendiste hoy.'
    }
    
    useEffect(() => {
        controllerNotifications.createListener();
        if(mode[0] === 'testMode'){
            dispatch(calcTime());
        }
    })

    if(mode[0] === 'finishMode'){
        information.title = 'termino';
        information.subtitle = 'termino';
        information.message = 'termino';
    }

    function timer(){
        if(mode[0] === 'testMode'){
            return <CreateTimerCount fnPress={ async () => {
                const words = await getStorage('words');
                dispatch(clearWordel())
                controllerNotifications.removeNotification('notificationId')
                navigation.navigate('wordel', words.learn[0])
            } }/>
        }
        return null
    }

    return (
        <View style={ [{ padding: 10  }, { flex: 1 } ] }>
            <Button title="create notification" onPress={() => controllerNotifications.createNotification('test', 'test', {"english": "react", "espanish": "reaccionar", "pronunciation": "rēakt", "pronunciationSpanish": "riakt"}, 30000) }/>
            <Button title="remove" onPress={() => removeStorage() }/>
            <CreateBoxLearnWord viewRender={ mode[0] === 'learnMode' ? true : false } />
            <CreateBoxInformative viewRender={
                    mode[0] === 'testMode' ? true : 
                    mode[0] === 'finishMode' ? true : false
                }
                title={ information.title } subtitle={ information.subtitle } 
                message={ information.message } SubElement={ timer } />
            <Button title="test" onPress={ async () => {
                const words = await getStorage('words');
                dispatch(clearWordel())
                controllerNotifications.removeNotification('notificationId')
                navigation.navigate('wordel', words.learn[0])
            }} />
        </View>
    )
}

