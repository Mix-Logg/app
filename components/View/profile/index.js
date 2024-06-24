import twrnc, { style } from 'twrnc';
import { useEffect, useState } from 'react';
import { View, Image,Text , TouchableOpacity, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import colors from "tailwindcss/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FixBar from '../../fixBar';
import GetDelivery from '../../../api/getDelivery';
import GetPicture from '../../../api/getPicture';
import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome,
    Octicons
  } from "@expo/vector-icons";
export default function Profile({navigation}){
    
    const handleLogout = async () => {
        await AsyncStorage.removeItem('access');
        await AsyncStorage.removeItem('striper');
        await AsyncStorage.removeItem('am');
        await AsyncStorage.removeItem('uuid');
        await AsyncStorage.removeItem('raceId');
        await AsyncStorage.removeItem('codeInitial');
        await AsyncStorage.removeItem('codeFinish');
        await AsyncStorage.removeItem('vehicle');
        navigation.navigate('Login')
    }

    const handleAvalidPhoto = async () => {
        navigation.navigate('AvalidPhoto')
    }

    const handleChangePassword = async () => {
        navigation.navigate('ChangePassword')
    }

    const [email,setEmail] = useState('Aguarde...')
    const [name,setName] = useState('')
    const [buffer,setBuffer] = useState('')
    const [type,setType] = useState('')
    const [wait,setWait] = useState(true)

    useEffect(() => {
        dataEffect = async () => {
            const delivery = await GetDelivery()
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
        <>
            <FixBar navigation={navigation} opition={'profile'}/>
            <ScrollView className="bg-white p-3">
                <View className='flex-row w-full mt-3 p-3'>
                    <View className={`h-20 w-20 rounded-full ${ wait && 'bg-primary'}`}>
                        { wait ?
                            <Image
                            source={require('../../../img/logo/logoComplement1.png')}
                            style={twrnc`h-full w-full`}
                            resizeMode="contain"
                            />
                                :
                            <Image
                                source={{ uri: `data:${type};base64,${buffer}` }}
                                className='h-full w-full rounded-full'
     
                            />
                        }
                    </View>
                    <View className='ml-2 justify-center'>
                        <Text className='text-2xl font-bold w-5/6 text-primary'>{name}</Text>
                    </View>
                </View>
                <View className='p-2 mt-9'>
                    {/* <TouchableOpacity className="flex-row p-3 rounded-lg w-full text-neutral-600 justify-start items-center">
                        <AntDesign
                            name="retweet"
                            size={24}
                            color={colors.neutral[500]}
                        />
                        <Text className="ml-4 text-sm text-left text-neutral-600 font-bold w-40">Dados perfil</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity className="flex-row p-3 rounded-lg w-full text-neutral-600 justify-start items-center"
                        onPress={handleAvalidPhoto}
                    >
                        <FontAwesome name="picture-o" size={22} color={colors.neutral[500]}  />
                        <Text className="ml-4 text-sm text-left text-neutral-600 font-bold w-40">Fotos</Text>
                    </TouchableOpacity >
                    <TouchableOpacity className="flex-row p-3 rounded-lg w-full text-neutral-600 justify-start items-center"
                        onPress={handleChangePassword}
                    >
                        <Octicons name="key" size={22} color={colors.neutral[500]} />
                        <Text className="ml-4 text-sm text-left text-neutral-600 font-bold w-40">Editar senha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row p-3 rounded-lg w-full text-neutral-600 justify-start items-center">
                        <MaterialCommunityIcons
                            name="headset"
                            size={24}
                            color={colors.neutral[500]}
                        />
                        <Text className="ml-4 text-sm text-left text-neutral-600 font-bold w-40">Ajuda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row p-3 rounded-lg w-full text-neutral-600 justify-start items-center"
                        onPress={handleLogout}
                    > 
                        <MaterialIcons
                            name="logout"
                            size={24}
                            color={colors.red[500]}
                        />
                        <Text className="ml-4 text-sm text-left text-red-500 font-bold w-40">Sair</Text>
                    </TouchableOpacity>
                    
                    <View className="flex-row p-3 rounded-lg w-full justify-start items-start mt-2">
                        <Text className="text-sm text-left text-neutral-400 font-medium w-40">Version actual 6.0v</Text>
                    </View>
                </View>
            </ScrollView>
            {/* <ScrollView style={twrnc`bg-white`}>
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
                            <Pressable style={twrnc`bg-[#191919] rounded-lg flex flex-row justify-center items-center py-3 px-2 gap-2`}
                                onPress={()=>handleChangePassword()}
                            >
                                <Octicons name="key" size={24} color="white" />
                                <Text style={twrnc`text-white`}>MUDAR SENHA</Text>
                            </Pressable>
                        </View>
                    </View>

            </ScrollView> */}
        </>
    )
}