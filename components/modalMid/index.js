import Modal from "react-native-modal";
import { useState } from "react";
import { View } from "react-native";
import twrnc from "twrnc";
export default function ModalMid({children}){
    const [ show, setShow ] = useState(true)

    const handleClose = () => {
        setShow(!show)
    }

    return (
        <Modal  
            isVisible={show} 
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={300}
            animationOutTiming={300}
        >
            <View style={twrnc`bg-white w-full rounded-lg`}>
                {children}
            </View>
        </Modal>
    )
}