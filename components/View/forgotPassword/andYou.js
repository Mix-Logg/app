import { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { AntDesign,Fontisto } from '@expo/vector-icons';
import GetDelivery from "../../../api/getDelivery"
import GetPicture  from "../../../api/getPicture"
import Mask        from "../../../hooks/mask"
import Wating      from "../../wating"
import codeForgot  from "../../../hooks/createCodeForgot";
export default function AndYou({user, setUser, setCode}){

    const [buffer,setBuffer] = useState(false)
    const [type,setType]     = useState(false)
    const [delivery, setDelivery]     = useState(false)

    const handleNotMe = () => {
        setUser(false)
    };
    
    const handleRetreiveWhatsapp = async () => {
        const response = await codeForgot(delivery.phone, 'whatsapp');
        if(response.status == 200){
            setCode(response.code)
            return
        }
        console.log('bug')
    };

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await GetDelivery(user.am, user.uuid);
                setDelivery(response)
                const image = await GetPicture('selfie', user.am, user.uuid)
                setBuffer(image[0])
                setType(image[1])
            }catch(e){
                console.log(e)
            }
        }
        fetchData()
    },[])

    return(
        <>
            { buffer && type && delivery ?
                <ScrollView>
                    <View className='items-center justify-center mt-5'>
                        <Text className='text-lg font-semibold text-primary'>Encontramos !</Text>
                        <Text className='font-light'>
                            Achamos um registro, é você ?
                        </Text>
                    </View>
                    <View className='items-center mt-10'>
                        <View className='bg-[#fafafa] border-[#C7C7C7] border rounded-3xl w-5/6 p-3'>
                            <View className='items-center'>
                                <View className='h-20 w-20'>
                                    <Image
                                        source={{ uri: `data:${type};base64,${buffer}` }}
                                        className='h-full w-full rounded-full'
                                    />
                                </View>
                            </View>
                            <View className='mt-12'>
                                    <View className='flex-row items-center'>
                                        <AntDesign name="user" size={16} color="#FF5F00" />
                                        <Text className='ml-3 font-light'>
                                            {delivery.name}
                                        </Text>
                                    </View>
                                    <View className='flex-row items-center my-5'>
                                        <AntDesign name="phone" size={16} color="#FF5F00" />
                                        <Text className='ml-3 font-light'>
                                            {Mask('hiddenPhone',delivery.phone)}
                                        </Text>
                                    </View>
                                    <View className='flex-row items-center '>
                                        <Fontisto name="email" size={16} color="#FF5F00" />
                                        <Text className='ml-3 font-light'>
                                            {Mask('hiddenEmail',delivery.email)}
                                        </Text>
                                    </View>
                            </View>
                            <View className='items-center mt-8'>
                                <View className='items-center'>
                                    <Text className='text-lg font-semibold text-primary'>Código de verificação</Text>
                                    <Text className='font-light text-xs'>Aonde deseja receber o seu código?</Text>
                                </View>
                                <TouchableOpacity className='rounded-full bg-primary flex-row mt-3 w-5/6 justify-between h-10 items-center px-5'
                                    onPress={handleRetreiveWhatsapp}                     
                                >
                                    <Fontisto name="whatsapp" size={20} color="white" />
                                    <Text className='w-20 text-white text-base font-semibold'> Whatsapp</Text>
                                    <AntDesign name="right" size={12} color="white" />
                                </TouchableOpacity>
                                <View className='rounded-full bg-primary flex-row mt-3 w-5/6 justify-between h-10 items-center px-5 opacity-80'>
                                    <Fontisto name="email" size={20} color="#FFFFFF" />
                                    <Text className='w-20 text-white text-base font-semibold'> E-mail</Text>
                                    <AntDesign name="setting" size={16} color="white" />
                                </View>
                            </View>
                            <View className='items-center mt-5'>
                                <TouchableOpacity 
                                    onPress={handleNotMe}
                                >
                                    <Text className='font-semibold'>
                                        Não é meu perfil
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                :
                <Wating/>
            }
        
        </>
    )
}