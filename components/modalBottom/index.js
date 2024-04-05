import { useState, ReactNode } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import Modal from "react-native-modal";
import twrnc from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
export default function ModalBottom({children}){
    const [show,setShow] = useState(true)
    
    const handleModal = () => {
        setShow(!show)
    }
    
    return(
        <SafeAreaView>
            <Modal
            isVisible={show}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={300}
            animationOutTiming={300}
            style={twrnc`justify-end p-0 m-0`}
        >
            <View style={twrnc`bg-white h-full`}>
                <Pressable style={twrnc`px-5 py-10 justify-center`}
                    onPress={()=>handleModal()}
                >
                    <AntDesign name="close" size={24} color="black" />
                </Pressable>
                <View style={twrnc`px-5`}>
                    {children}
                </View>
            </View>
            </Modal>
        </SafeAreaView>
        
    )
}