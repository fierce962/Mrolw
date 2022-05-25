import React from "react";
import { View, Text, StyleSheet } from 'react-native';

import TextTitle from "./TextTitle";



export default function CreateBoxInformative({ viewRender, title, subtitle, message, SubElement }){
    if(viewRender){
        return (
            <View style={ style.contentInformative }>
                <TextTitle text={ title } typeStyle={ 'main' } />
                <View style={ style.subtitle }>
                    <TextTitle text={ subtitle } typeStyle={ 'secundary' }/>
                    <Text style={{ color: '#fff' }}>
                        { message }
                    </Text>
                </View>
                <View style={ style.subElement }>
                    <SubElement />
                </View>
            </View>
        );
    }
    return null
};

const style = StyleSheet.create({
    contentInformative: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subtitle: {
        alignItems: 'center'
    },
    subElement: {
        minWidth: '70%'
    }
})