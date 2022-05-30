import React from 'react';
import notifee, { TriggerType, EventType } from '@notifee/react-native';

import { controllerNavigation } from './ControllerNavigation';
import { setStorage, getStorage, removeStorage } from '../models/Storage';
class ControllerNotifications{
    initialNotification = true;
    
    createListener(){
        this.createListenerFirstplane();
        this.getInitialNotification();
    }

    async getInitialNotification(){
        const initialNotification = await notifee.getInitialNotification();
        if(initialNotification !== null && this.initialNotification){
            console.log('nitial notification', initialNotification.data)
            this.actionsPress(initialNotification.notification.data, initialNotification.pressAction.id);
        }else{
            this.initialNotification = false;
            console.log('no se disparo el initial', this.initialNotification);
        }
    }

    createListenerFirstplane(){
        notifee.onForegroundEvent(({ type, detail }) => {
            if(type === EventType.DELIVERED){
                //.cancelNotification(detail.notification.id)
                console.log('se cancelo')
            }
        })
    }

    createListenerBackgraound(){
        notifee.onBackgroundEvent(async ({ type, detail }) => {
            const { notification } = detail;
            if (type === EventType.PRESS) {
                await setStorage('notificationBack', {
                    pressAction: notification.android.pressAction,
                    data:  notification.data
                });
            }
        });
    }

    hasEqualDay(data, action){
        const day = `${ new Date().getDate() }`;
        if(data.day !== undefined && data.day !== day && action[1] === 'wordel'){
            const errorObject = this.createMessageError(action[1]);
            return [false, errorObject];
        }
        return [true];
    }

    createMessageError(nameRoute){
        const errorObject = {
            title: 'Ha ocurrido un error', 
            subTitle: 'Lo semtimos', 
            nameIcon: 'home', 
            textBtn: 'ir al inicio', 
            routeName: 'home'
        }
        if(nameRoute === 'wordel'){
            errorObject.subTitle += ' su prueba caduco, no se preocupe podra volve hacerla'; 
        }
        return errorObject;
    }

    async actionsPress(data, pressActionId){
        const action = pressActionId.split('-');
        const EqualDay = this.hasEqualDay(data, action);
        if(action[0] === 'open' && EqualDay[0]){
            controllerNavigation.get().navigate(action[1], data);
        }else{
            controllerNavigation.get().navigate('error', EqualDay[1]);
        };
    }

    async removeNotification(nameStore){
        console.log('fn remove remove notification')
        let id = await getStorage(nameStore);
        if(id !== null){
            await notifee.cancelNotification(id);
        };
    }

    async createNotification(title, body, dataInput = {}, time = 300){
        console.log('create notification');
        const date = new Date(new Date().getTime() + time);
        dataInput.day = `${ date.getDate() }`;
        console.log('create notification', dataInput)
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