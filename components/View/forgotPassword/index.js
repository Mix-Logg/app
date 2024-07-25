import { AntDesign, Feather, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Linking, ActivityIndicator } from "react-native"
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AndYou from './andYou';
import RetrieveCode from './retrieveCode';
import MaskInput     from 'react-native-mask-input';
import FindUserCpf   from '../../../hooks/findUserByCpf';
import Toastify from '../../toastify';
import colors from 'tailwindcss/colors';
export default function ForgotPassword(){
    const navagation = useNavigation()
    const [cpf,setCpf] = useState('')
    const [code, setCode] = useState(false)
    const [codeConfirm, setCodeConfirm] = useState(false)
    const [user,setUser] = useState(false)
    const [notify, setNotify] = useState('')
    const [loader, setLoader] = useState(false)
    const [notifyIsVisible, setNotifyIsVisible] = useState(true)

    const handleHelp = async () => {
        const phoneNumber = '5511978612671';
        const message = `Olá, preciso de ajuda com a recuperação de senha`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        Linking.openURL(url)
            .catch(err => console.error('Erro ao abrir o WhatsApp:', err));
    };

    const handleRetrieve = async () => {
        if(loader == true){
            return
        }
        if(cpf.length != 11){
            setNotify( <Toastify option={'warning'} info={'CPF não foi digitado corretamente.'} isVisible={notifyIsVisible} setIsVisible={setNotify}/>)
            return
        }
        setLoader(true)
        await setNotify('')
        const response = await FindUserCpf(cpf)
        switch (response.status) {
            case 500:
                setNotify( <Toastify option={'danger'} info={'CPF não foi encontrado, verifique se digitou corretamente'} isVisible={notifyIsVisible} setIsVisible={setNotify}/>)
                setLoader(false)
                break;
            default:
                setTimeout(() => {
                    setUser(response)
                    setLoader(false)
                }, 2000);
                break
            }
    };

    return(
        <>
            {notify}
            <View className='bg-primary p-5'>
                    <TouchableOpacity className='flex-row items-center'
                        onPress={()=>navagation.navigate('Login')}
                    >
                        <View>
                            <AntDesign name="left" size={16} color="white" />
                        </View>
                        <Text className='ml-3 text-white'>Voltar</Text>
                    </TouchableOpacity>
            </View>
            <View className='bg-primary'>
                <View className='p-5 bg-white h-full rounded-t-xl'>
                    { !user ?
                        <>
                            <View className='items-center mt-10'>
                                <View className='bg-primary rounded-xl p-3'>
                                    {/* <Feather name="lock" size={36} color="#FF5F00" /> */}
                                    <Octicons name="key" size={26} color="white" />
                                </View>
                                <Text className='text-xl font-semibold text-primary'>Recuperação de Senha</Text>
                                <Text className='font-light text-secondary'>Digite seu CPF para indentificarmos sua conta</Text>
                            </View>
                            <View className='mt-5 items-center '>
                                <View className='w-full'>
                                    <View className='absolute top-3 left-2'>
                                        <Feather name="user" size={22} color="#FF5F00" />
                                    </View>
                                    <MaskInput
                                        className={`p-2 h-12 text-lg border border-primary rounded-xl text-center font-light `}
                                        mask={[/\d/, /\d/, /\d/,'.', /\d/, /\d/,/\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                        onChangeText={(masked, unmasked)=>setCpf(unmasked)}
                                        value={cpf}
                                        keyboardType="numeric"
                                        placeholder='CPF'
                                    />
                                </View>
                            </View>
                            <View className='items-center mt-10'>
                                <TouchableOpacity className={`bg-primary w-5/6 rounded-3xl h-10 items-center justify-center ${loader && 'opacity-80'}`}
                                    onPress={handleRetrieve}
                                >
                                    { loader ?
                                        <ActivityIndicator 
                                        color={'white'}
                                        />
                                        :
                                        <Text className='text-white font-bold text-lg'>Recuperar</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View className='items-center justify-center w-full mt-16'>
                                <TouchableOpacity className="flex-row p-3 rounded-lg w-24 text-neutral-600 justify-start items-center"
                                    onPress={handleHelp}
                                >
                                    <MaterialCommunityIcons
                                        name="headset"
                                        size={24}
                                        color={colors.neutral[500]}
                                    />
                                    <Text className="ml-2 text-sm text-left text-neutral-600 font-bold w-40">Ajuda</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    :
                        <>
                            { code ?
                                codeConfirm ?
                                    <></>
                                    :
                                    <RetrieveCode code={code} setCode={setCode} setCodeConfirm={setCodeConfirm}/>
                                :
                                <AndYou user={user} setUser={setUser} setCode={setCode}/>
                            }
                        </>
                    }
                </View>
            </View>
    
        </>
    )
}