import React from 'react';
import notifee, { TriggerType, EventType } from '@notifee/react-native';
import { controllerNavigation } from './ControllerNavigation'
class ControllerNotifications{

    createListener(){
        this.createListenerFirstplane();
        this.createListenerbackGround();
    }

    createListenerFirstplane(){
        notifee.onForegroundEvent(({ type, detail }) => {
            console.log('action')
        })
    }

    createListenerbackGround(){
        notifee.onBackgroundEvent(async ({ type, detail }) => {
            const { notification, pressAction } = detail;
            if(pressAction.id === 'open-wordel'){
                controllerNavigation.get().navigate('wordel', notification.data);
            }
        });
    }

    async createNotification(){
        const date = new Date(new Date().getTime() + 300);

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
                title: 'Meeting with Jane',
                body: 'Today at 11:20am',
                data: {
                    english: "makes",
                    espanish: "hace",
                    pronunciation: "māks",
                    pronunciationSpanish: "meiks"
                },
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