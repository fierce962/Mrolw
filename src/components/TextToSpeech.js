import React from "react";
import Tts from 'react-native-tts';
import IconTouchable from "./IconTouchable";

export default function TextToSpeech({ textSpeech }){

    return(
        <IconTouchable iconName={ 'volume-up' } sizeIcon={ 40 } 
                        fnPress={ () => {
                            Tts.setDefaultLanguage('en-US').then(result => {
                                Tts.speak(textSpeech);
                            });
                        }}/>
    )
}