import React from 'react';
import notifee, { TriggerType, EventType } from '@notifee/react-native';
import { controllerNavigation } from './ControllerNavigation'
class ControllerNotifications{

    createListener(){
        this.createListenerFirstplane();
        this.createListenerOpenNotification();
    }

    createListenerFirstplane(){
        notifee.onForegroundEvent(({ type, detail }) => {
            console.log('action')
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

    async createNotification(title, body, dataInput = {}, time = 300){
        const date = new Date(new Date().getTime() + time);
        console.log(date);
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            sound: 'doorbell'
        });

        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(), 
        }
        
        await notifee.createTriggerNotification(
            {
                title: title,
                body: body,
                data: dataInput,
                android: {
                    channelId: channelId,
                    sound: 'doorbell',
                    pressAction: {
                        id: 'open-wordel',
                        launchActivity: 'default',
                    },
                },
            },
            trigger,
        );
    }
}

export const controllerNotifications = new ControllerNotifications();