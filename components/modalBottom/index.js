import { useState, ReactNode } from 'react';
import { View, Text, Pressable } from 'react-native';
import Modal from "react-native-modal";
import twrnc from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
export default function ModalBottom({children}, visible){
    const [show,setShow] = useState(visible)
    
    const handleModal = () => {
        setShow(!show)
    }
    
    return(
        <Modal
            isVisible={show}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={300}
            animationOutTiming={300}
            style={twrnc`justify-end p-0 m-0`}
        >
            <View style={twrnc`bg-white h-6/8 rounded-t-3xl`}>
                <Pressable style={twrnc`px-5 py-2 justify-center`}
                    onPress={()=>handleModal()}
                >
                    <AntDesign name="close" size={24} color="black" />
                </Pressable>
                <View style={twrnc`px-5`}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}