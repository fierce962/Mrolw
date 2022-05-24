import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { restTime } from '../features/timerCount/timerCountSlice';

export default function CreateTimerCount(){
    const dispatch = useDispatch();
    const goalDate = useSelector(state => state.timer.goalDate);
    const time = useSelector(state => state.timer.timeRemaining);

    let animate = new Animated.Value(0);
    Animated.timing(animate, {
        toValue: -40,
        duration: 1000,
        useNativeDriver: false,
        delay: 3000
    }).start();

    if(time >= 0){
        setTimeout(() => {
            console.log('time out');
            Animated.timing(animate, {
                toValue: 0,
                duration: 0,
                useNativeDriver: false,
            }).start();
            dispatch(restTime());
        }, 4000);
    }else{
        console.log('ya no mas')
    }

    const fisrtNumber = [
        style.viewAnimation,
        time[1] - 1 < 0 && { bottom: animate },
        time[1] - 1 >= 0 && { bottom: 0 }
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
}

const style = StyleSheet.create({
    contentTimer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    contentText: {
        width: 25,
        height: 40,
        alignItems: 'center',
        backgroundColor: 'red',
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