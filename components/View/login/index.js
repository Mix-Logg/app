import twrnc from 'twrnc';
import { View, Image,Text ,TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import MaskInput from 'react-native-mask-input';
import Modal from "react-native-modal";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wating from '../../wating';
export default function Login({navigation}){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.45:8080/'
    const URL = URLdevelopment
    const [cpf,setCpf] = useState('')
    const [password,setPassword] = useState('')
    const [acessModal,setAcessModal] = useState(false)
    const [wating,setWating] = useState(true)

    const handleCpf = async (txt) => {
        setCpf(txt)
    }

    const handleAcess = async () => {
        const auth = {
            cpf:cpf,
            password:password
        }
        if(cpf === '' || password === ''){
            setAcessModal(!acessModal)
            return
        }
        try{
            const res = await axios.post(`${URL}user/auth`, auth)
            if(res.data != null){
                await AsyncStorage.setItem('access', '1');
                await AsyncStorage.setItem('am', res.data.am);
                await AsyncStorage.setItem('cpf', res.data.cpf);
                return navigation.navigate('Home')
            }
            setAcessModal(!acessModal)
            return
        }catch(error){
            console.log('err:',error)
            setAcessModal(!acessModal)
            return
        }
    }

    useEffect(() => {
        dataEffect = async () => {
            const access = await AsyncStorage.getItem('access');
            if(access === '1'){
                navigation.navigate('Home')
            }else{
                setWating(false)
            }
        }
        dataEffect()
    }, []);

    return(
        <>
        { !wating ?
            <View style={[twrnc`flex items-center  justify-center h-full `]} >
                
                <View style={[twrnc`flex w-full items-center mt-3`,{height:'20%'} ]}>
                    <Image style={[twrnc``, {width:'45%', height:'90%',} ] }
                    source={require('../../../img/logo/logoAsa.png')}
                    resizeMode="contain"
                    />
                </View>

                <View style={twrnc`w-full gap-5`}>
                    <View style={twrnc`px-5`}>
                        <Text style={twrnc`text-[#FF5F00] font-bold text-sm px-4`}>CPF</Text>
                        <View style={twrnc`w-full border-2 border-[#FF5F00] rounded-xl flex flex-row items-center p-2`}>
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
                            />
                        </View>
                    </View>

                    <View style={twrnc`px-5`}>
                        <Text style={twrnc`text-[#FF5F00] font-bold text-sm px-4`}>Senha</Text>
                        <View style={twrnc`w-full border-2 border-[#FF5F00] rounded-xl flex flex-row items-center p-2`}>
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
                    <Pressable style={twrnc`bg-[#FF5F00] font-bold flex justify-center flex-row py-5 rounded-lg`}
                        onPress={handleAcess}
                    >
                        <Text style={twrnc`font-bold text-white`}>
                            Entrar
                        </Text>
                    </Pressable>
                    {/* CADASTRAR  */}
                    <Pressable style={twrnc`border-2 border-[#FF5F00] font-bold flex justify-center flex-row py-5 rounded-lg`}
                        onPress={()=>{navigation.navigate('Register')}}
                        >
                        <Text style={twrnc`font-bold text-[#FF5F00]`}>Não sou cadastrado</Text>
                    </Pressable>
                    {/* ESQUECI A SENHA */}
                    <Pressable style={twrnc`items-center`}>
                        <Text style={twrnc`font-bold text-[#FF5F00]`}>Esqueci minha senha</Text>
                    </Pressable>
                </View>

                <Modal 
                    isVisible={acessModal} 
                    onBackdropPress={()=>setAcessModal(!acessModal)}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={300}
                    animationOutTiming={300}
                >
                    <View style={twrnc`flex items-center justify-center px-3  w-1/2 mx-auto  bg-white rounded-lg`}>
                        <View style={[twrnc` w-full h-1/6`]}>
                            <Image
                                style={[twrnc`w-full h-full`, {resizeMode: 'contain'}]}
                                source={require('../../../img/icons/warning.png')}
                            />
                        </View>
                        <Text style={twrnc`font-medium text-xl text-neutral-600 py-2 text-center`}>Acesso Incorreto</Text>
                        <Pressable
                            style={twrnc`w-full justify-center flex items-center mt-2 py-2 rounded-full  bg-[#FF5F00] `}
                            onPress={()=>{setAcessModal(!acessModal)}}
                        >
                            <Text style={twrnc`font-bold text-white`}>Fechar</Text>
                        </Pressable>
                    </View>
                </Modal>
            </View> 
            :
            <>
                <Wating/>
            </>
        }
        </>

    )
}

