import twrnc from 'twrnc';
import { View,Text , TouchableOpacity, Image, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import GetDelivery from '../../api/getDelivery';
import Mask from '../mask';
export default function Bar({navigation}){
    const [name,setName] = useState('Entregador')

    const handleProfile = () => {
        navigation.navigate('Profile')
    }

    useEffect(() => {
        dataEffect = async () => {
            const res = await GetDelivery()
            const name = await Mask(res.name, 'firstName')
            setName(name)
        }
        dataEffect()
    }, []);

    return(
        <View className={`bg-primary flex flex-row items-center w-full justify-between h-20`}>
            <StatusBar backgroundColor='#FF5F00' />
            <View style={twrnc`flex flex-row h-full w-1/2 gap-2 px-5 items-center`}>
                <View style={twrnc`w-2/8 h-1/2`}>
                    <Image 
                        source={require('../../img/logo/logoComplement1.png')}
                        resizeMode="contain"
                        style={{ width: '100%', height:'100%' }}
                    />
                </View>
            <View >
                <Text className={`font-bold text-sm text-white`}> Olá, {name}</Text>
                <Text className={`text-xs text-white`}> Bem Vindo(a) à Mix!</Text>
            </View>
            </View>
            <TouchableOpacity style={twrnc`w-2/6 h-2/6`}
                onPress={handleProfile}
            >
                <Image 
                    source={require('../../img/icons/Usercircle.png')}
                    resizeMode="contain"
                    tintColor={'white'}
                    style={{ width: '100%', height:'100%' }}
                />
            </TouchableOpacity>
        </View>
    )
}