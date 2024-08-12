import twrnc, { style } from 'twrnc';
import { useEffect, useState } from 'react';
import { View, Image,Text , TouchableOpacity, StatusBar, ScrollView, SafeAreaView, Linking } from 'react-native';
import colors from "tailwindcss/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FixBar from '../../fixBar';
import GetDelivery from '../../../api/getDelivery';
import GetPicture from '../../../api/getPicture';
import Mask from '../../../hooks/mask';
import AllStorage from '../../../hooks/findAllStorage';
import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome,
    Octicons,
    Fontisto 
} from "@expo/vector-icons";
export default function Profile({navigation}){

    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [buffer,setBuffer] = useState('')
    const [type,setType] = useState('')
    const [wait,setWait] = useState(true)
    
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
    };

    const handleAvalidPhoto = async () => {
        navigation.navigate('AvalidPhoto')
    };

    const handleChangePassword = async () => {
        navigation.navigate('ChangePassword')
    };

    const handleHelp = async () => {
        const storage = await AllStorage();
        const phoneNumber = '5511978612671';
        const message = `Olá, preciso de ajuda com meu perfil ${storage.am == 'driver' ? `sou Motorista #${storage.uuid}` : `sou Auxiliar #${storage.uuid}` }.`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        Linking.openURL(url)
            .catch(err => console.error('Erro ao abrir o WhatsApp:', err));
    };

    useEffect(() => {
        dataEffect = async () => {
            const delivery = await GetDelivery()
            const image = await GetPicture('selfie')
            setBuffer(image[0])
            setType(image[1])
            setPhone(delivery.phone)
            setName(delivery.name)
            setEmail(delivery.email)
            setWait(false)
        }
        dataEffect()
    }, []);

    return(
        <>
            <FixBar navigation={navigation} opition={'profile'}/>
            <ScrollView className="bg-white p-3">
                {/* <Text className='text-xl font-bold text-primary'>{name}</Text> */}
                <View className='flex-row w-full mt-1 p-3'>
                    <View className={`h-20 w-20 rounded-full ${ wait && 'bg-primary p-2'}`}>
                        { wait ?
                            <Image
                            source={require('../../../img/logo/logoAsa.png')}
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
                    
                    <View className='ml-2'>
                        <View className='flex-row items-end'>
                            {/* <AntDesign name="user" size={18} color="#FF5F00" /> */}
                            <Text className='text-lg font-bold w-5/6 text-primary'>{name}</Text>
                        </View>
                        <View className='flex-row items-end'>
                            <AntDesign name="phone" size={18} color={'#FF5F00'}/>
                            <Text className='ml-2 text-sm font-bold w-6/6 text-primary mt-1 '>{Mask('phone',phone)}</Text>
                        </View>
                        <View className='flex-row items-end'>
                            <Fontisto name="email" size={18} color={'#FF5F00'}/>
                            <Text className='ml-2 text-sm font-bold w-6/6 text-primary mt-1 '>{email}</Text>
                        </View>
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
                    <TouchableOpacity className="flex-row p-3 rounded-lg w-full text-neutral-600 justify-start items-center"
                        onPress={handleHelp}
                    >
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
                        <Text className="text-sm text-left text-neutral-400 font-medium w-40">Version actual 2.5.0v</Text>
                    </View>
                </View>
            </ScrollView>           
        </>
    )
}