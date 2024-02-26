import { View,Text , Pressable } from 'react-native';
import Modal from "react-native-modal";
import { useState } from "react";
import twrnc from "twrnc";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
 export default function PopUp( {type, txt, show} ){
    const [isOpen, setIsOpen] = useState(show)
    let pop;
    const handleClose = () => {
        setIsOpen(false)
    }

   switch (type) {
    case 'warning':
    pop =   <Modal  
                isVisible={isOpen} 
                onBackdropPress={handleClose}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={300}
                animationOutTiming={300}
            >
                <View style={twrnc`bg-white p-5 rounded-lg items-center gap-8`}>
                    <Ionicons name="warning" size={50} style={twrnc`text-[#FBBF24]`} />
                    <Text style={twrnc`font-bold`}>
                            {txt}
                    </Text>
                    <Pressable style={twrnc`bg-[#FBBF24] py-2 px-5 rounded-lg`}
                            onPress={handleClose}
                        >
                            <Text style={twrnc`text-white font-bold`}>FECHAR</Text>
                    </Pressable>
                </View>
            </Modal>
            break;
    case 'danger':
        pop =   <Modal  
                    isVisible={isOpen} 
                    onBackdropPress={handleClose}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={300}
                    animationOutTiming={300}
                >
                    <View style={twrnc`bg-white p-5 rounded-lg items-center gap-8`}>
                        <AntDesign name="closecircleo" size={50} style={twrnc`text-[#dc2626]`} />
                        <Text style={twrnc`font-bold`}>
                                {txt}
                        </Text>
                        <Pressable style={twrnc`bg-[#dc2626] py-2 px-5 rounded-lg`}
                                onPress={handleClose}
                            >
                                <Text style={twrnc`text-white font-bold`}>FECHAR</Text>
                        </Pressable>
                    </View>
                </Modal>
        break;
    case 'success':
        pop =   <Modal  
        isVisible={isOpen} 
        onBackdropPress={handleClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
    >
        <View style={twrnc`bg-white p-5 rounded-lg items-center gap-8`}>
            <Feather name="check-circle" size={50} style={twrnc`text-[#22c55e]`} />
            <Text style={twrnc`font-bold`}>
                    {txt}
            </Text>
            <Pressable style={twrnc`bg-[#22c55e] py-2 px-5 rounded-lg`}
                    onPress={handleClose}
                >
                    <Text style={twrnc`text-white font-bold`}>FECHAR</Text>
            </Pressable>
        </View>
                </Modal>
        break;
    default:
        pop =   <Modal  
                isVisible={isOpen} 
                onBackdropPress={handleClose}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={300}
                animationOutTiming={300}
            >
                <View style={twrnc`bg-white p-5 rounded-lg items-center gap-8`}>
                    <Text style={twrnc`font-bold`}>
                            {txt}
                    </Text>
                    <Pressable style={twrnc`bg-[#7B7B7B] py-2 px-5 rounded-lg`}
                            onPress={handleClose}
                        >
                            <Text style={twrnc`text-white font-bold`}>FECHAR</Text>
                    </Pressable>
                </View>
                </Modal>
        break;
   }
   
   return <>{pop}</> 
}