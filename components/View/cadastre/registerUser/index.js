import twrnc from "twrnc";
import { View, Image,Text ,TextInput, Pressable, ScrollView, Button } from 'react-native';
import { useEffect, useState } from 'react';
import MaskInput from 'react-native-mask-input';
import { FontAwesome } from '@expo/vector-icons';
import FixBar from "../../../fixBar";
import validateCPF from "../../../../function/validCPF";
export default function RegisterUser({navigation}){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    const [cpf,setCpf] = useState(null)
    const [password,setPassword] = useState(null)
    const [passwordAgain,setPasswordAgain] = useState(null)

    const handleCpf = async (txt) => {
        setCpf(txt)
        const valid = validateCPF(txt)
        console.log('CPF:',cpf, 'VALID:', valid)
    }

    const handlePassword = async (txt) => {
        setPassword(txt)
        console.log('Password:',password)
    }

    const handlePasswordAgain = async (txt) => {
        setPasswordAgain(txt)
        console.log('Again:',passwordAgain)
    }

    return(
        <ScrollView>
            <View style={twrnc`h-200`}>
                <FixBar navigation={navigation} opition={'register'} />
                <View style={twrnc`mt-5 p-5 gap-2`}>
                    <Text style={twrnc`text-[#7B7B7B] font-bold`}>
                        O seu CPF vai ser utilizado para acesso ao aplicativo
                    </Text>
                    <Text style={twrnc`text-[#7B7B7B] font-bold`}>
                        A senha tem que ter 8 digitos 
                    </Text>
                </View>
                <View style={twrnc`p-2 mt-5 justify-center ml-1`}>
                    <Text style={twrnc`font-bold`}>Digite seu CPF</Text>
                    <View style={twrnc`flex-row items-center gap-6`}>
                        <MaskInput
                            style={twrnc`p-2 text-2xl border-[#FF5F00] border-2 rounded-lg w-4/6`}
                            mask={[/\d/, /\d/, /\d/,'.', /\d/, /\d/,/\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                            onChangeText={(masked, unmasked)=>handleCpf(unmasked)}
                            value={cpf}
                            keyboardType="numeric"
                            placeholder="000.000.000-00"
                        />
                    { cpf === true ?
                        <View>
                            <FontAwesome name="check" size={35} style={twrnc`text-[#FF5F00]`} />
                        </View>
                        : cpf === false ?
                        <View>
                            <FontAwesome name="close" size={37} style={twrnc`text-[#FF5F00]`} />
                        </View> : ''
                    }
                    </View>
                </View>
                <View style={twrnc`p-2 gap-5`}>
                    <View>
                        <Text style={twrnc`font-bold`}>Digite sua senha</Text>
                        <View style={twrnc`flex-row items-center gap-6`}>
                            <TextInput style={twrnc`p-2 text-2xl border-[#FF5F00] border-2 rounded-lg w-4/6`}
                                maxLength={8}
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(txt)=>{handlePassword(txt)}}
                            />
                            { password === true ?
                            <View>
                                <FontAwesome name="check" size={35} style={twrnc`text-[#FF5F00]`} />
                            </View>
                            : password === false ?
                            <View>
                                <FontAwesome name="close" size={37} style={twrnc`text-[#FF5F00]`} />
                            </View> : ''
                            }
                        </View>
                    </View>
                    <View>
                        <Text style={twrnc`font-bold`}>Redigite sua senha</Text>
                        <View style={twrnc`flex-row items-center gap-6`}>
                            <TextInput style={twrnc`p-2 text-2xl border-[#FF5F00] border-2 rounded-lg w-4/6`}
                                maxLength={8}
                                secureTextEntry={true}
                                value={passwordAgain}
                                onChangeText={(txt)=>{handlePasswordAgain(txt)}}
                            />
                            { passwordAgain === true ?
                            <View>
                                <FontAwesome name="check" size={35} style={twrnc`text-[#FF5F00]`} />
                            </View>
                            : passwordAgain === false ?
                            <View>
                                <FontAwesome name="close" size={37} style={twrnc`text-[#FF5F00]`} />
                            </View> : ''
                            }
                        </View>
                    </View>
                </View>
                <View style={twrnc`w-full justify-center items-center mt-8`}>
                    <Pressable style={twrnc`w-2/6 rounded py-2 border border-[#FF5F00] items-center `}>
                        <Text style={twrnc`text-[#FF5F00] font-bold`}>Continuar</Text>
                    </Pressable>
                </View>
            </View>

        </ScrollView>
    )

}