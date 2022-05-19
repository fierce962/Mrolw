import React from 'react';

class ControllerNotifications{
    createNotification(){
        // - 30 minutos 1.8e+6
        console.log(new Date(new Date().getTime() + 120000))
    }
}

export const controllerNotifications = new ControllerNotifications();