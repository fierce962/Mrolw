import React from "react";
import { View, Text } from 'react-native';

import TextTitle from "./TextTitle";



export default function CreateBoxInformative({ viewRender, title, subtitle, message, SubElement }){
    if(viewRender){
        return (
            <View>
                <TextTitle text={ title } typeStyle={ 'main' } />
                <TextTitle text={ subtitle } typeStyle={ 'secundary' }/>
                <Text style={{ color: '#fff' }}>
                    { message }
                </Text>
                <SubElement />
            </View>
        );
    }
    return null
};