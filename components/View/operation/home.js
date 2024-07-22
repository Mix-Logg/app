
import { View, Text, Image, TouchableOpacity} from "react-native";
import { useEffect, useState} from "react";
import BarOperation from "../../barOperation";
import FindOneOperationToday from "../../../hooks/findOneOperationToday";
import TimeLineOperationToday from "../../timeLineOperationToday";
import Wating from "../../wating";
import GetPicture  from "../../../api/getPicture";
import GetDelivery from "../../../api/getDelivery";
import Mask from "../../../hooks/mask";
import Access from "./access";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
export default function OperationHome(){
    const navigation = useNavigation()
    
    const [haveOperation, setHaveOperation] = useState(null)
    const [name,setName] = useState('')
    const [buffer,setBuffer] = useState(null)
    const [type,setType] = useState(null)
    

    const handleBack = () => {
        navigation.navigate('Home')
    }

    useEffect(()=>{
        const fetchData = async () => {
            const delivery = await GetDelivery()
            const image = await GetPicture('selfie')
            setName(delivery.name)
            setBuffer(image[0])
            setType(image[1])
        }
        fetchData()
    },[])

    return(
        <> 
        { buffer && type ?
            <View className='bg-white h-full'>
                        <View className='bg-primary p-3'>
                            <View className='my-4'>
                                <TouchableOpacity className='text-white flex-row items-end'
                                    onPress={handleBack}
                                >
                                    <AntDesign name="arrowleft" size={20} color="white" />
                                    <Text className='ml-1 text-white text-base'>voltar</Text>
                                </TouchableOpacity>
                            </View>
                            <View className='flex-row '>
                                <View className={`h-20 w-20 border border-white rounded-full `}>
                                    <Image
                                        source={{ uri: `data:${type};base64,${buffer}` }}
                                        className='h-full w-full rounded-full'
                                        
                                    />                      
                                </View>
                                <View className='ml-1'>
                                    <Text className='text-base text-white p-3 font-medium'>
                                        Oi, {"\n"}
                                        <Text className='text-xl'>
                                            {Mask('firstName',name)}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className='bg-primary'>
                            <View className='px-2 py-4 rounded-t-3xl bg-white'>
                                <View className>
                                    <TimeLineOperationToday/>
                                </View>
                                <View>
                                    <Access/>
                                </View>
                            </View>
                        </View>
            </View>
            :
            <Wating/>
        }
        </>

       
    )
}