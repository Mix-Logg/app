import React from 'react';
import twrnc from 'twrnc';
import { View, Image,Text ,TextInput, TouchableOpacity, StatusBar, } from 'react-native';
import { useEffect, useState } from 'react';
import MaskInput from 'react-native-mask-input';
import Modal from "react-native-modal";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Wating from '../../wating';
import GetDelivery from '../../../api/getDelivery';
import PopUp from '../../modal';
export default function Login({navigation}){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.10:8080/'
    const URL = URLproduction
    const [cpf,setCpf] = useState('')
    const [password,setPassword] = useState('')
    const [acessModal,setAcessModal] = useState(false)
    const [waiting,setWaiting] = useState(true)
    const [modal,setModal] = useState('')

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
                await AsyncStorage.setItem('access', '1');
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
            {/* <StatusBar
            backgroundColor='#fff' /> */}
        { !waiting ?
            <View style={[twrnc`flex items-center  justify-center h-full`]} >
                {modal}
                <View style={[twrnc`flex w-full items-center mt-3`,{height:'20%'} ]}>
                    <Image style={[twrnc``, {width:'45%', height:'90%',} ] }
                    source={require('../../../img/logo/logoAsa.png')}
                    resizeMode="contain"
                    />
                </View>
                <View style={twrnc`w-full gap-5`}>
                    <View style={twrnc`px-5`}>
                        <Text style={twrnc`text-[#FF5F00] font-bold text-sm px-4`}>CPF</Text>
                        <View style={twrnc`w-full border border-[#FF5F00] rounded-xl flex flex-row items-center p-2`}>
                            <Image
                                style={[twrnc``, {width:'7%', height:'55%',tintColor: '#FF5F00'}]}
                                source={require('../../../img/icons/user.png')}/>
                            {/* <TextInput style={twrnc`p-2 w-full text-lg`}
                                keyboardType="numeric"

                            />   */}
                            <MaskInput
                                style={twrnc`p-2 w-full text-lg`}
                                mask={[/\d/, /\d/, /\d/,'.', /\d/, /\d/,/\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                onChangeText={(masked, unmasked)=>handleCpf(unmasked)}
                                value={cpf}
                                keyboardType="numeric"
                                placeholder=''
                            />
                        </View>
                    </View>

                    <View style={twrnc`px-5`}>
                        <Text style={twrnc`text-[#FF5F00] font-bold text-sm px-4`}>Senha</Text>
                        <View style={twrnc`w-full border border-[#FF5F00] rounded-xl flex flex-row items-center p-2`}>
                            <Image
                                style={[twrnc``, {width:'7%', height:'55%',tintColor: '#FF5F00'}]}
                                source={require('../../../img/icons/senha.png')}/>
                            <TextInput style={twrnc`p-2 w-full text-lg`}
                                secureTextEntry
                                maxLength={8}
                                value={password}
                                onChangeText={ (txt)=>{setPassword(txt)} }
                            />
                        </View>
                    </View>
                </View>
                <View style={twrnc`flex w-3/6 mt-10 gap-5`}>
                    {/* ENTRAR */}
                    <TouchableOpacity style={twrnc`bg-[#FF5F00] font-bold flex justify-center flex-row py-5 rounded-lg`}
                        onPress={handleAcess}
                    >
                        <Text style={twrnc`font-bold text-white`}>
                            Entrar
                        </Text>
                    </TouchableOpacity>
                    {/* CADASTRAR  */}
                    <TouchableOpacity style={twrnc`border border-[#FF5F00] font-bold flex justify-center flex-row py-5 rounded-lg`}
                        onPress={handleNoCadastre}
                        >
                        <Text style={twrnc`font-bold text-[#FF5F00]`}>Não sou cadastrado</Text>
                    </TouchableOpacity>
                    {/* ESQUECI A SENHA */}
                    <TouchableOpacity style={twrnc`items-center`}>
                        <Text style={twrnc`font-bold text-[#FF5F00]`}>Esqueci minha senha</Text>
                    </TouchableOpacity>
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

