import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react";
import MaskInput, { Masks } from 'react-native-mask-input';
import FastShopLogo from '../../../../img/partners/logoFastShop.png'
import MixLogo from '../../../../img/logo/logoAsa.png'
import FindOneTeam from "../../../../hooks/findOneTeam";
export default function FastShop(){
    const navigation = useNavigation();
    const [dateWork,setDateWork] = useState('00/00/0000')
    

    useEffect(()=>{
        const fetchData = async () => {
            const team = await FindOneTeam();
            console.log(team)
            const date = getTomorrowDate();
            setDateWork(date)
        }
        fetchData()
    },[])

    const getTomorrowDate =  () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (tomorrow.getDay() == 0) {
            return false;
        }
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
        const year = tomorrow.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return(
        <>
            <StatusBar backgroundColor={'black'}/>
            <View className='h-20 bg-black rounded-b-3xl'>
                
            </View>
            <ScrollView className='p-5'>
                <View className='h-24 w-24'>
                    <Image
                        source={FastShopLogo}
                        className='w-full h-full'
                        resizeMode="contain"
                    />
                </View>
                {   !dateWork ?
                    <>
                        <View className='items-center mt-5'>
                            <Text className='font-light text-lg'>Amanhã não tem carregamento</Text>
                        </View>
                    </>
                    :
                    <>
                        <View className='mt-5 '>
                            <Text className='font-light text-lg '>Busque seu auxiliar e confirme a disponibilidade para carregar amanhã.</Text>
                            <Text className='text-xl font-bold mt-5'>{dateWork}</Text>
                        </View>
                        <View className='mt-5'>
                            <View>
                               
                            </View>
                            <View className='mt-10'>
                                <View className='items-center w-full'>
                                    <TouchableOpacity className='bg-terciary w-1/2 h-8 rounded items-center justify-center'> 
                                        <Text className='text-lg text-white font-bold'>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </>
                }
                <View className='items-center flex-row justify-center mt-14'>
                    <Image
                        source={MixLogo}
                        className='h-5 w-6 mr-2'
                    />
                    <Text className="text-primary font-bold text-xs">Mix Serviços Logístico</Text>
                </View>
            </ScrollView>
        </>
    )
}