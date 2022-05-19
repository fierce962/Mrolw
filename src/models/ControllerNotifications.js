import React from 'react';
import { Notifications } from 'react-native-notifications';

class ControllerNotifications{
    createNotification(){
        // - 30 minutos 1.8e+6
        console.log(new Date(new Date().getTime() + 120000))
        Notifications.postLocalNotification({
            body: "Local notification!",
            title: "Local Notification Title",
            sound: "chime.aiff",
            silent: false,
            category: "SOME_CATEGORY",
            userInfo: { },
            fireDate: new Date(new Date().getTime() + 120000),
        });
    }
}

export const controllerNotifications = new ControllerNotifications();