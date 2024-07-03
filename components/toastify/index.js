import Modal from "react-native-modal";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState, useRef } from "react";
export default function Toastify({setIsVisible, isVisible ,option, info}){
    const [icon, setIcon] = useState('')
    const [color, setColor] = useState('white')
    
    
    useEffect(()=>{
        switch (option) {
            case 'success':
                setIcon(<AntDesign name="checkcircle" size={24} color="#16a34a" />)
                setColor('#16a34a')
                break;
            case 'warning':
                setIcon(<AntDesign name="exclamationcircle" size={24} color="#eab308" />)
                setColor('bg-yellow-500')
                break;
            case 'danger':
                setIcon(<AntDesign name="closecircle" size={24} color="#dc2626" />)
                setColor('#dc2626')
                break;
        
            default:
                break;
        }
    },[])

    return(
        <Modal
            isVisible={isVisible} 
            animationIn="slideInDown"
            animationOut="slideOutRight"
            animationInTiming={800}
            animationOutTiming={200}
        >
            <View className='h-full w-full py-7'>
                <View className='bg-white flex-row rounded-t-lg'>
                    <View className='w-full flex-row justify-between py-2'>
                        <View className='bg-pink py-3 px-3 flex-row '>
                            {icon}
                        <View className='h-fit w-5/6'>
                            <Text className='ml-3 w-6/6'>
                                {info}
                            </Text>
                        </View>
                        </View>
                        <TouchableOpacity className='px-2'
                            onPress={()=>setIsVisible(false)}
                        >
                            <AntDesign name="close" size={20} color="#737373" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className={`bg-[${color}] ${color} w-6/6 py-1 transition-colors duration-500 rounded-b-lg`}/>
            </View>
        </Modal>
    )
}