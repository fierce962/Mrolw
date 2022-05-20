import React from "react";
import { View, Text } from 'react-native';

import TextTitle from "./TextTitle";
import CreateButton from './CreateButton';


export default function CreateBoxInformative({ viewRender }){
    if(viewRender){
        return (
            <View>
                <TextTitle text={ 'Termino el modo estudio' } typeStyle={ 'main' } />
                <TextTitle text={ 'Modo de pruebas' } typeStyle={ 'secundary' }/>
                <Text style={{ color: '#fff' }}>llegara una notificacion informando cuando puedas 
                    entrar al modo pruebas, en el cual tendras que traducir de 
                    español a ingles una de las palabras aprendiste hoy.
                </Text>
            </View>
        );
    }
    return null
};