import React from 'react';
import notifee, { TriggerType  } from '@notifee/react-native';
class ControllerNotifications{
    async createNotification(){
        console.log(new Date(new Date().getTime() + 300))
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

        console.log(trigger.timestamp)
        
        await notifee.createTriggerNotification(
            {
                title: 'Meeting with Jane',
                body: 'Today at 11:20am',
                android: {
                    channelId: channelId,
                    sound: 'doorbell'
                },
            },
            trigger,
        );
    }
}

export const controllerNotifications = new ControllerNotifications();