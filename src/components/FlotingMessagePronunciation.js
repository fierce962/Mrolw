import React from "react";
import { useSelector } from "react-redux";

import FloatingMessage from "./FloatingMessage";


export default function FlotingMessagePronunciation({ message, topSpacing }){
    const noSpeech = useSelector(state => state.pronunciation.noSpeech);

    if(noSpeech){
        <FloatingMessage message={ message } topSpacing={ topSpacing } />
    }
    return null
}


