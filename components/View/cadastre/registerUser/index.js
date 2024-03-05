import twrnc from "twrnc";
import { View, Image,Text ,TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import MaskInput from 'react-native-mask-input';
import FixBar from "../../../fixBar";
import PopUp from "../../../modal";
import validateCPF from "../../../../function/validCPF";
import verifyCpf from "../../../../hooks/verifyCpf";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Btn from "../../../btn";
export default function RegisterUser({navigation}){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLproduction
    const [cpf,setCpf] = useState('')
    const [password,setPassword] = useState('')
    const [passwordAgain,setPasswordAgain] = useState('')
    const [eyeAgain,setEyeAgain] = useState(true)
    const [eye,setEye] = useState(true)
    const [popUp,setPopUp] = useState('')
    const route = useRoute();

    const handleEye = async (option) => {
        if(option === 'password'){
            setEye(!eye)
            return;
        }
        setEyeAgain(!eyeAgain)
        return;
    }

    const handleHelper = async () => {
        await modal('helper')
    }
    
    const handleCpf = async (txt) => {
        setCpf(txt);
    }

    const handlePassword = async (txt) => {
        setPassword(txt);
    }

    const handlePasswordAgain = async (txt) => {
        setPasswordAgain(txt)
    }

    const handleSubmit = async () => {
        const cpfValid = await validateCPF(cpf);
        const avalid = await verifyCpf(route.params.user.am, cpf)
        if(!cpfValid || avalid === 200){
            await modal('cpf')
            return;
        }
        if(password.length != 8){
            await modal('password')
            return;
        }
        if(passwordAgain != password){
            await modal('passwordAgain')
            return;
        }
        route.params.user.login = cpf;
        route.params.user.password = password;
        navigation.navigate('RegisterContact',route.params);
        return;
    }

    const modal = async (option) => {
        await setPopUp('')
        if(option === 'password'){
            await setPopUp(<PopUp type={'warning'} txt={'A senha deve ter 8 digitos'} show={true} />);
            return;
        }
        if(option === 'passwordAgain'){
            await setPopUp(<PopUp type={'warning'} txt={'Senhas não são iguais'} show={true} />)
            return;
        }
        if(option === 'cpf'){
            await setPopUp(<PopUp type={'warning'} txt={'CPF inválido ou já registrado'} show={true} />)
            return;
        }
        if(option === 'helper'){
            await setPopUp(<PopUp txt={'Senha deve ter 8 digitos e seu CPF vai ser utilizado para acesso ao app MIX'} show={true} />)
            return;
        }
    }


    return(
        <SafeAreaView style={twrnc`bg-white mt-6`}>
            <FixBar navigation={navigation} opition={'register'} />
            <ScrollView style={twrnc`bg-white`}>
                {popUp}
                <View style={twrnc`h-200`}>
                    <Pressable style={twrnc`mt-5 p-5 gap-2 w-full justify-center items-center`}
                        onPress={handleHelper}
                    >
                        <Entypo name="help-with-circle" size={40} style={twrnc`text-[#FF5F00]`} />
                        <Text style={twrnc`text-xs font-bold`}>Clique para tirar dúvidas!</Text>
                    </Pressable>
                    <View style={twrnc`p-5 px-20 mt-5 justify-center gap-2 `}>
                        <Text style={twrnc`text-base`}>Digite seu CPF</Text>
                        <View style={twrnc`flex-row items-center`}>
                            <MaskInput
                                style={twrnc`p-3 text-lg bg-white rounded-lg w-full border border-[#d4d4d4]`}
                                mask={[/\d/, /\d/, /\d/,'.', /\d/, /\d/,/\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                onChangeText={(masked, unmasked)=>handleCpf(unmasked)}
                                value={cpf}
                                keyboardType="numeric"
                                placeholder=""
                            />
                        </View>
                    </View>
                    <View style={twrnc`gap-2 w-full mb-15`}>
                        <View style={twrnc`px-20`}>
                            <Text style={twrnc`text-base`}>Digite sua senha</Text>
                            <View style={twrnc`items-center flex-row gap-2`}>
                                <TextInput 
                                    style={twrnc`p-3 text-lg bg-white rounded-lg w-full border border-[#d4d4d4]`}
                                        maxLength={8}
                                        secureTextEntry={eye}
                                        value={password}
                                    onChangeText={(txt)=>{handlePassword(txt)}}
                                />
                                <Pressable
                                    onPress={()=>handleEye('password')}
                                    style={twrnc`w-2/8`}
                                >
                                    <View>
                                        { eye ?
                                            <Ionicons name="eye" size={24} color="black" />
                                            :
                                            <Ionicons name="eye-off" size={24} color="black" />
                                        }
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        <View style={twrnc`px-20`}>
                            <Text style={twrnc`text-base`}>Redigite sua senha</Text>
                            <View style={twrnc`items-center flex-row gap-2`}>
                                <TextInput 
                                    style={twrnc`p-3 text-lg bg-white rounded-lg w-full border border-[#d4d4d4]`}
                                        maxLength={8}
                                        secureTextEntry={eyeAgain}
                                        value={passwordAgain}
                                    onChangeText={(txt)=>{handlePasswordAgain(txt)}}
                                />
                                <Pressable
                                    onPress={()=>handleEye('again')}
                                    style={twrnc`w-2/8`}
                                >
                                    <View>
                                        { eyeAgain ?
                                            <Ionicons name="eye" size={24} color="black" />
                                            :
                                            <Ionicons name="eye-off" size={24} color="black" />
                                        }
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <Btn title={'Continue'} action={handleSubmit} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}