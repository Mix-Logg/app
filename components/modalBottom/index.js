import { useState, ReactNode } from 'react';
import { View, Text } from 'react-native';
import Modal from "react-native-modal";
import twrnc from 'twrnc';
export default function ModalBottom({children}){
    const [show,setShow] = useState(true)
    
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
            swipeDirection={['down']}
            onSwipeComplete={handleModal}
        >
            <View style={twrnc`bg-white h-6/8 rounded-t-3xl`}>
                <View style={twrnc`items-center justify-center py-3`}>
                    <View style={twrnc`bg-[#e5e5e5] h-2 w-1/8 rounded-full`}></View>
                </View>
                <View style={twrnc`mt-5 px-5`}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}