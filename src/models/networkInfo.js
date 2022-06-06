import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { Subject } from 'rxjs';

class NetWorkInfo{
    actualStatus;
    networdStatus = new Subject();

    listenerNetwork(){
        NetInfo.addEventListener(state => {
            if(this.networdStatus === undefined){
                this.networdStatus = new Subject();
                this.networdStatus.next(state.isConnected);
                this.actualStatus = state.isConnected;
            }else if(this.actualStatus !== state.isConnected){
                console.log('se cambio el stado');
                this.actualStatus = state.isConnected;
                this.networdStatus.next(state.isConnected);
            }
        });
    };

    hasReconnected(){
        return new Promise(resolve => {
            this.networdStatus.subscribe(reconect => {
                if(reconect) resolve(reconect);
            });
        });
    }
}

export const { listenerNetwork, hasReconnected } = new NetWorkInfo();

