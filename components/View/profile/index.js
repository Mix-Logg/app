import twrnc, { style } from 'twrnc';
import { useEffect, useState } from 'react';
import { View, Image,Text , Pressable, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FixBar from '../../fixBar';
import GetDelivery from '../../../api/getDelivery';
import GetPicture from '../../../api/getPicture';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export default function Profile({navigation}){
    
    const handleLogout = async () => {
        await AsyncStorage.removeItem('access');
        navigation.navigate('Login')
    }

    const handleAvalidPhoto = async () => {
        navigation.navigate('AvalidPhoto')
    }

    const [email,setEmail] = useState('Aguarde...')
    const [name,setName] = useState('Aguarde...')
    const [buffer,setBuffer] = useState('')
    const [type,setType] = useState('')
    const [wait,setWait] = useState(true)

    useEffect(() => {
        dataEffect = async () => {
            const delivery = await GetDelivery()
            console.log(delivery)
            const image = await GetPicture('selfie')
            setBuffer(image[0])
            setType(image[1])
            setEmail(delivery.email)
            setName(delivery.name)
            setWait(false)
        }
        dataEffect()
    }, []);

    return(
        <SafeAreaView style={twrnc`mt-6 bg-white h-full`}>
            <FixBar navigation={navigation} opition={'profile'}/>
            <ScrollView >
                
                    <View style={twrnc`items-center mt-5`}>
                        <Pressable style={[twrnc`absolute flex-row gap-2 justify-center items-center`,{top:'9%'}]}
                            onPress={handleLogout}
                        >
                            <Text style={twrnc`text-red-600`}>Sair</Text>
                            <Ionicons name="exit-outline" size={24} style={twrnc`text-red-600`} /> 
                        </Pressable>
                    </View>
                    <View style={twrnc`mt-20 items-center h-180`}>
                        <View style={[twrnc`w-full justify-center items-center absolute`, { width:'38%', height:'21%'}]}>
                            <View style={[twrnc`rounded-full border-2 absolute`, {zIndex:0, width:'100%', height:'100%'}]}>
                            { wait ?
                                <Image
                                    source={require('../../../img/logo/logoAsa.png')}
                                    style={twrnc`h-full w-full rounded-full`}
                                    resizeMode="contain"
                                />
                                :
                                <Image
                                    source={{ uri: `data:${type};base64,${buffer}` }}
                                    style={twrnc`w-full h-full rounded-full`}
                                    
                                />
                            }
                            </View>
                            <Pressable onPress={handleAvalidPhoto}
                            style={[twrnc`rounded-full border-2 w-9 h-9 justify-center items-center bg-white`,{left:'40%', top:'30%', zIndex:5}]}>
                                <Octicons name="pencil" size={24} color="black" />
                            </Pressable>
                        </View>
                        <View style={twrnc`justify-center items-center h-full gap-20`}>
                            <View style={twrnc`w-full h-20 gap-5`}>
                                <View style={twrnc`py-3 px-5 bg-[#EFEFEF] flex flex-row items-center gap-2`}>
                                    <AntDesign name="user" size={24} color="black" />
                                    <Text style={twrnc`text-[#7B7B7B]`}>{name}</Text>
                                </View>
                                <View style={twrnc`py-3 px-5 bg-[#EFEFEF] flex flex-row items-center gap-2`}>
                                    <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                                    <Text style={twrnc`text-[#7B7B7B]`}>{email}</Text>
                                </View>
                            </View>
                            <View style={twrnc`bg-[#191919] rounded-lg flex flex-row justify-center items-center py-3 px-2 gap-2`}>
                                <Octicons name="key" size={24} color="white" />
                                <Text style={twrnc`text-white`}> MUDAR SENHA</Text>
                            </View>
                            {/* <Pressable style={twrnc`flex flex-row rounded-lg  items-center justify-center gap-2 px-2 py-3 gap-2 bg-red-500`}
                                onPress={handleLogout}
                                >
                                    <MaterialCommunityIcons name="logout" size={24} color="black" />
                                    <Text style={twrnc`font-bold`}>SAIR</Text>
                            </Pressable> */}
                        </View>
                    </View>

            </ScrollView>
        </SafeAreaView>
    )
}