import twrnc from "twrnc";
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View, TextInput, Pressable } from "react-native";
import FixBar from "../../fixBar";
import Btn from "../../btn";
import { useState } from "react";
import Help from "../../help";
import PopUp from "../../modal";
import FindUser from "../../../hooks/findUser";
import UpdateUser from "../../../hooks/updateUser";
export default function ChangePassword({navigation}){

    const [oldPassword , setOldPassword]=useState()
    const [newPassword , setNewPassword]=useState()
    const [againPassword , setAgainPassword]=useState()
    const [eye , setEye]=useState(false)
    const [eyeAgain , setEyeAgain]=useState(false)
    const [modal , setModal]=useState('')

    const popUp = (option) => {
        if(option == 'length'){
            setModal(<PopUp type={'warning'} txt={'A senha deve ter 8 dígitos'} show={true} />)
            return;
        }
        if(option == 'old'){
            setModal(<PopUp type={'warning'} txt={'Senha antiga está incorreta!'} show={true} />)
            return;
        }
        if(option == 'different'){
            setModal(<PopUp type={'warning'} txt={'As senhas não são iguais'} show={true} />)
            return;
        }
        if(option == 'success'){
            setModal(<PopUp type={'success'} txt={'Senha alterada com sucesso!'} show={true} />)
            return;
        }
        if(option == 'error'){
            setModal(<PopUp type={'danger'} txt={'Senha não foi alterada, tente mais tarde!'} show={true} />)
            return;
        }
    }

    const handleEye = (option) => {
        if(option === 'eye'){
            setEye(!eye)
            return;
        }
        setEyeAgain(!eyeAgain)
    }

    const handleSubmit = async () => {
        await setModal('')
        const user = await FindUser();
        if(user.password != oldPassword){
            popUp('old')
            return;
        }
        if(newPassword.length != 8){
            popUp('length')
            return;
        }
        if(newPassword != againPassword){
            popUp('different')
            return;
        }
        const response = await UpdateUser(user.id, newPassword)
        if(response == 200){
            popUp('success')
            return;
        }
        popUp('error')
    }

    return(
        <>
            {modal}
            <FixBar navigation={navigation} opition={'changePassword'}/>
            <ScrollView style={twrnc`h-full bg-white`}>
                <View style={twrnc`w-full items-center justify-center mt-5`}>
                    <View style={twrnc`w-3/6 gap-15`}>
                    <Help txt={'A nova senha deve ter 8 dígitos'} />
                        <View>
                            <Text style={twrnc`text-[#7B7B7B] font-bold`}>Senha antiga</Text>
                            <TextInput style={twrnc`border border-[#7B7B7B] rounded-lg h-9 pl-2`}
                                value={oldPassword}
                                onChangeText={(txt)=>setOldPassword(txt)}
                                maxLength={8}
                                secureTextEntry={true}
                            />

                        </View>
                        <View style={twrnc`gap-4`}>
                            <View>
                                <Text style={twrnc`text-[#7B7B7B] font-bold`}>Senha nova</Text>
                                <View style={twrnc`flex-row w-full items-center gap-2`}>
                                    <TextInput style={twrnc`border border-[#7B7B7B] rounded-lg h-9 pl-2 w-full`}
                                        onChangeText={(txt)=>setNewPassword(txt)}
                                        value={newPassword}
                                        maxLength={8}
                                        secureTextEntry={!eye}
                                    />
                                    <Pressable
                                        onPress={()=>handleEye('eye')}
                                    >
                                        { eye ?
                                            <Ionicons name="eye-off" size={24} color="black" /> :
                                            <Ionicons name="eye" size={24} color="black" />
                                        }
                                    </Pressable>
                                </View>
                            </View>
                            <View style={twrnc`w-full`}>
                                <Text style={twrnc`text-[#7B7B7B] font-bold`}>Redigite a senha nova</Text>
                                <View style={twrnc`flex-row w-full items-center gap-2`}>
                                    <TextInput style={twrnc`border border-[#7B7B7B] rounded-lg h-9 pl-2 w-full`}
                                        maxLength={8}
                                        value={againPassword}
                                        secureTextEntry={!eyeAgain}
                                        onChangeText={(txt)=>setAgainPassword(txt)}
                                    />
                                    <Pressable
                                        onPress={()=>handleEye('eyeAgain')}
                                    >
                                        { eyeAgain ?
                                            <Ionicons name="eye-off" size={24} color="black" /> :
                                            <Ionicons name="eye" size={24} color="black" /> 
                                        }
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <Btn title={'Enviar'} action={handleSubmit}/>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}