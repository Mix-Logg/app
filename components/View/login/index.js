import React from 'react';
import twrnc from 'twrnc';
import { Feather, Ionicons } from '@expo/vector-icons';
import { View, Image,Text ,TextInput, TouchableOpacity, StatusBar, Pressable, } from 'react-native';
import { useEffect, useState } from 'react';
import MaskInput from 'react-native-mask-input';
import Modal from "react-native-modal";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Wating from '../../wating';
import GetDelivery from '../../../api/getDelivery';
import PopUp from '../../modal';
import BouncyCheckbox from "react-native-bouncy-checkbox";
export default function Login({navigation}){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.5:8080/'
    const URL = URLproduction
    const [cpf,setCpf] = useState('')
    const [password,setPassword] = useState('')
    const [acessModal,setAcessModal] = useState(false)
    const [waiting,setWaiting] = useState(true)
    const [modal,setModal] = useState('')
    const [remember, setRemember] = useState(false)
    const [passIsVisible, setPassIsVisible] = useState(true)

    const handleCpf = async (txt) => {
        setCpf(txt)
    }

    const handleAcess = async () => {
        setWaiting(true)
        await setModal('')
        const auth = {
            cpf:cpf,
            password:password
        }
        if(cpf === '' || password === ''){
            await modalOption('warning')
            setWaiting(false)
            return
        }
        try{
            const res = await axios.post(`${URL}user/auth`, auth)
            if(res.data != 500){
                if(remember){
                    await AsyncStorage.setItem('access', '1');
                }else{
                    await AsyncStorage.setItem('access', '0');
                }
                await AsyncStorage.setItem('am', res.data.am);
                await AsyncStorage.setItem('uuid', res.data.uuid.toString());
                navigation.navigate('Home');
                return;
            }
            await modalOption('error')
        }catch(error){
            await modalOption('server')
            return
        }finally{
            setWaiting(false)
        }
        
    }

    const handleNoCadastre = async () => {
        navigation.navigate('RegisterCarProfile')
    }

    const modalOption = async (option) => {
        await setModal('')
        if(option == 'error'){
            await setModal(<PopUp type={'danger'} txt={'Acesso incorreto!'} show={true} />);
            return;
        }
        if(option == 'warning'){
            await setModal(<PopUp type={'warning'} txt={'Acesso inválido!'} show={true} />);
            return;
        }
        if(option == 'server'){
            await setModal(<PopUp type={'danger'} txt={'Verifique sua internet ou tente mais tarde!'} show={true} />);
            return;
        }
    }

    useFocusEffect(
        React.useCallback(() => {
        const fetchData = async () => {
            const access = await AsyncStorage.getItem('access');
            if (access === '1') {
              navigation.navigate('Home');
            } else {
              setWaiting(false);
            }
        };
        fetchData();
        }, [navigation])
    );

    return(
        <View style={twrnc`bg-white h-full`}>
            <StatusBar
            backgroundColor='#FF5F00' />
        { !waiting ?
            <View className='bg-primary h-full'>
                {modal}
                <View className='items-center justify-center'>
                    <View className='mt-14 items-center'>
                        <View className='rounded-full border-primary h-36 w-36 items-center justify-center '>
                            <Image className={`w-22 h-28`}
                            source={require('../../../img/logo/logoComplement1.png')}
                            resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View className=' items-center justify-center w-5/6 p-3 rounded-3xl bg-white shadow-lg shadow-black'>
                        <View>
                            <Text className='text-primary font-semibold'>Mix Serviços Logísticos</Text>
                        </View>
                        <View className='mt-10 w-5/6'>
                            <View>
                                <View className='absolute top-3 left-2'>
                                    <Feather name="user" size={22} color="#FF5F00" />
                                </View>
                                <MaskInput
                                    className={`p-2 text-lg border border-primary rounded-3xl text-center font-light `}
                                    mask={[/\d/, /\d/, /\d/,'.', /\d/, /\d/,/\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                    onChangeText={(masked, unmasked)=>handleCpf(unmasked)}
                                    value={cpf}
                                    keyboardType="numeric"
                                    placeholder='CPF'
                                />
                            </View>
                            <View className='mt-5'>
                                <View className={`p-2 justify-between items-center flex-row text-lg border border-primary rounded-3xl text-center font-light`}>
                                    <View >
                                        <Feather name="lock" size={20} color="#FF5F00" />
                                    </View>
                                    <TextInput 
                                        className='text-lg text-center font-light w-36 h-7'
                                        secureTextEntry={passIsVisible}
                                        maxLength={8}
                                        placeholder='Senha'
                                        value={password}
                                        onChangeText={ (txt)=>{setPassword(txt)} }
                                    />  
                                    <TouchableOpacity
                                        onPress={()=>setPassIsVisible(!passIsVisible)}
                                    >
                                        { passIsVisible ? 
                                            <Ionicons name="eye-off-outline" size={24} color="#FF5F00" />
                                            :
                                            <Ionicons name="eye-outline"     size={24} color="#FF5F00" />
                                        }
                                    </TouchableOpacity>                              
                                </View>
                            </View>
                        </View>
                        <View>
                            <View className='flex-row justify-between w-full px-5 mt-3 items-center'>
                                <View className='flex-row w-24 items-center'
                                    onPress={()=>console.log('xx')}
                                >
                                    <View className='w-5'>
                                        <BouncyCheckbox
                                            size={16}
                                            fillColor="#ff5f00"
                                            unfillColor="#f4f4f4"
                                            iconStyle={{ borderColor: "#ff5f00" }}
                                            innerIconStyle={{ borderWidth: 1 }}
                                            onPress={()=>setRemember(!remember)}
                                        />
                                    </View>
                                    <Text className='text-xs text-secondary'>Lembrar de mim</Text>
                                </View>
                                    
                                <TouchableOpacity
                                    onPress={()=>navigation.navigate('ForgotPassword')}
                                >
                                    <Text className='text-xs text-secondary '>
                                        Esqueci minha senha 
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View className='mt-5 items-center'>
                                <TouchableOpacity className='bg-primary w-1/2 rounded-3xl px-5 py-2 items-center justify-center'
                                    onPress={handleAcess}
                                >
                                    <Text className='text-lg text-white font-bold'>
                                        Entrar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View className='mt-14 items-center'>
                                <Text className='font-light text-secondary'>
                                    Não é registrado?
                                </Text>
                                <TouchableOpacity className='rounded-3xl px-5 py-2' 
                                    onPress={handleNoCadastre}
                                >
                                    <Text className='text-primary'>Criar conta</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            :
            <>
                <Wating/>
            </>
        }
        </View>
    )
}

