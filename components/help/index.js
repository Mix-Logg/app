import { Entypo } from '@expo/vector-icons';
import PopUp from '../modal';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import twrnc from 'twrnc';

export default function Help({txt}){
    const [modal, setModal] = useState('')

    const handleHelp = async () => {
        await setModal('')
        setModal( <PopUp txt={txt} show={true} /> )
    } 
    
    return(
        <Pressable style={twrnc`w-full items-center gap-1`}
            onPress={handleHelp}
        >
            {modal}
            <Entypo name="help-with-circle" size={40} style={twrnc`text-[#FF5F00]`} />
            <Text style={twrnc`font-bold text-xs`}>Clique para tirar dúvidas!</Text>
        </Pressable>
    )
}