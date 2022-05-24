import React from 'react';
import notifee, { TriggerType, EventType } from '@notifee/react-native';
import { controllerNavigation } from './ControllerNavigation'
import { setStorage, getStorage } from '../models/Storage'
class ControllerNotifications{

    createListener(){
        this.createListenerFirstplane();
        this.createListenerOpenNotification();
    }

    createListenerFirstplane(){
        notifee.onForegroundEvent(({ type, detail }) => {
            if(type === EventType.DELIVERED){
                notifee.cancelNotification(detail.notification.id)
                console.log('se cancelo')
            }
        })
    }

    createListenerOpenNotification(){
        notifee.getInitialNotification().then(openNotification => {
            if(openNotification !== null){
                const { notification: { data }, pressAction } = openNotification;
                if(pressAction.id === 'open-wordel'){
                    controllerNavigation.get().navigate('wordel', data);
                };
            }
        });
    }

    async removeNotification(nameStore){
        console.log('fn remove remove notification')
        let id = await getStorage(nameStore);
        await notifee.cancelNotification(id);
    }

    async createNotification(title, body, dataInput = {}, time = 300){
        const date = new Date(new Date().getTime() + time);
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            sound: 'default'
        });

        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(), 
        }
        
        const notificationId = await notifee.createTriggerNotification(
            {
                title: title,
                body: body,
                data: dataInput,
                android: {
                    channelId: channelId,
                    sound: "default",
                    pressAction: {
                        id: 'open-wordel',
                        launchActivity: 'default',
                    },
                },
            },
            trigger,
        );

        await setStorage('notificationId', notificationId)
    }
}

export const controllerNotifications = new ControllerNotifications();