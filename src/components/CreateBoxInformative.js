import React from "react";
import { View, Text } from 'react-native';

import TextTitle from "./TextTitle";
import CreateButton from './CreateButton';


export default function CreateBoxInformative({ viewRender, title, subtitle, message }){
    if(viewRender){
        return (
            <View>
                <TextTitle text={ title } typeStyle={ 'main' } />
                <TextTitle text={ subtitle } typeStyle={ 'secundary' }/>
                <Text style={{ color: '#fff' }}>
                    { message }
                </Text>
            </View>
        );
    }
    return null
};