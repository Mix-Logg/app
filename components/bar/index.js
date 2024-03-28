import twrnc from 'twrnc';
import { View,Text , TouchableOpacity, Image } from 'react-native';
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
        <View style={[twrnc`bg-[#EFEFEF] flex flex-row items-center w-full justify-between`,{height:'10%'}]}>
            
            <View style={twrnc`flex flex-row h-full w-1/2 gap-2 px-5 items-center`}>
            <View style={twrnc`w-2/8 h-1/2`}>
                <Image 
                    source={require('../../img/logo/logoAsa.png')}
                    resizeMode="contain"
                    style={{ width: '100%', height:'100%' }}
                />
            </View>
            <View >
                <Text style={twrnc`font-bold text-sm`}> Olá, {name}</Text>
                <Text style={twrnc`text-xs`}> Bem Vindo(a) à Mix!</Text>
            </View>
            </View>
            <TouchableOpacity style={twrnc`w-2/6 h-2/6`}
                onPress={handleProfile}
            >
                <Image 
                    source={require('../../img/icons/Usercircle.png')}
                    resizeMode="contain"
                    style={{ width: '100%', height:'100%' }}
                />
            </TouchableOpacity>
        </View>
    )
}