import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CreateButton from './CreateButton';
import { restTime } from '../features/timerCount/timerCountSlice';

export default function CreateTimerCount({ fnPress, refTimeOut }){
    const dispatch = useDispatch();
    const time = useSelector(state => state.timer.timeRemaining);
    const seconds = useSelector(state => state.timer.seconds);
    console.log('create timer', seconds)
    if(time === undefined){
        return null
    }

    if(parseInt(time) > 0){
        let animate = new Animated.Value(0);
        Animated.timing(animate, {
            toValue: -40,
            duration: 1000,
            useNativeDriver: false,
            delay: seconds
        }).start();

        refTimeOut.ref = setTimeout(() => {
            console.log('se disparo el time out')
            Animated.timing(animate, {
                toValue: 0,
                duration: 0,
                useNativeDriver: false,
            }).start();
            dispatch(restTime());
        }, seconds + 1000);
        console.log(refTimeOut)
        const fisrtNumber = [
            style.viewAnimation,
            time[1] - 1 < 0 && time[0] !== '0' && { bottom: animate },
            time[1] - 1 >= 0 && { bottom: 0 },
        ]
        
        return (
            <View style={ style.contentTimer }>
                <View style={ style.contentText }>
                    <Animated.View style={ fisrtNumber }>
                        <Text style={ style.textTimer }>{ time[0] - 1 }</Text>
                        <Text style={ style.textTimer }>{ time[0] }</Text>
                    </Animated.View>
                </View>
                <View style={ style.contentText }>
                    <Animated.View style={[ style.viewAnimation, { bottom: animate } ]}>
                        <Text style={ style.textTimer }>{ time[1] === '0' ? 9 : time[1] - 1 }</Text>
                        <Text style={ style.textTimer }>{ time[1] }</Text>
                    </Animated.View>
                </View>
            </View>
        )
    }else{
        refTimeOut.ref = undefined;
        return <CreateButton title={ 'Practica' } size={ 22 } 
                    iconName={ 'angle-double-right' } 
                    fnPress={ fnPress } />
    }
}

const style = StyleSheet.create({
    contentTimer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    contentText: {
        width: 25,
        height: 40,
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    viewAnimation: {
        position: 'absolute',
    },  
    textTimer: {
        fontSize: 30,
        color: '#fff'
    }
})