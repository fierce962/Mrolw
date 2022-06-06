import React from "react";
import { useSelector } from "react-redux";

import FloatingMessage from "./FloatingMessage";


export default function FlotingMessagePronunciation({ message, topSpacing }){
    const noSpeech = useSelector(state => state.pronunciation.noSpeech);
    console.log('no espeech', noSpeech, message)
    if(noSpeech){
        console.log('entro en el if');
        return <FloatingMessage message={ message } topSpacing={ topSpacing } />
    }
    return null
}


