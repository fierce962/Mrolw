import React from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { calcTime } from '../features/timerCount/timerCountSlice';

export default function CreateTimerCount(){
    const dispatch = useDispatch();
    const goalDate = useSelector(state => state.timer.goalDate);
    const time = useSelector(state => state.timer.timeRemaining)

    if(time >= 0){
        setTimeout(() => {
            console.log('time out');
            dispatch(calcTime())
        }, 60000);
    }else{
        console.log('ya no mas')
    }

    return (
        <View>
            <Text style={ {color: '#fff' } }>{ time }</Text>
        </View>
    )
}