import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from "react-redux";

import { setState } from "../features/GeneralMessageFloating/GeneralMessageFloatingSlice";

import { Subject } from 'rxjs';

class NetWorkInfo{
    actualStatus;
    networdStatus = new Subject();

    listenerNetwork(){
        const dispatch = useDispatch();
        NetInfo.addEventListener(state => {
            const message = state.isConnected === true ? '' : 'Se perdio la conexion';
            const renderMessage = !state.isConnected;
            if(this.networdStatus === undefined){
                this.networdStatus = new Subject();
                this.networdStatus.next(state.isConnected);
                this.actualStatus = state.isConnected;
            }else if(this.actualStatus !== state.isConnected){
                this.actualStatus = state.isConnected;
                this.networdStatus.next(state.isConnected);
            };
            dispatch(setState({
                render: renderMessage,
                menssage: message,
            }))
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

