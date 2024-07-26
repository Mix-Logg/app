import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useState } from "react"
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import UpdateUser from "../../../hooks/updateUser";
import PopUp from "../../modal";
export default function ChangePassword({user}){
    const navigation = useNavigation()
    const [newPassword   , setNewPassword]  =useState()
    const [againPassword , setAgainPassword]=useState()
    const [modal         , setModal]        =useState('')
    const [success       , setSuccess]      =useState(false)

    const handleSubmit = async () => {
        if(newPassword.length != 8){
            popUp('length')
            return;
        }
        if(newPassword != againPassword){
            popUp('different')
            return;
        }
        const params = {
            password : newPassword
        }
        const response = await UpdateUser(user.id, params)
        if(response == 200){
            setSuccess(true)
            return;
        }
        popUp('error')
    };

    const popUp = async  (option) => {
        await setModal('')
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
    };

    const backToLogin = () => {
        navigation.navigate('Login')
    }

    return(
        <View>
            {modal}
            <View>
                { !success ?
                    <>
                        <View className='items-center mt-8'>
                            <Text className='text-xl font-bold text-primary'>
                                Confirmamos o código
                            </Text>
                            <Text className='font-light'>
                                Altere sua senha com sabedoria
                            </Text>
                        </View>
                        <View className='w-full items-center justify-center mt-10 '>
                            <View className='w-5/6'>
                                <View className='absolute top-3 left-2'>
                                    <Feather name="lock" size={22} color="#FF5F00" />
                                </View>
                                <TextInput 
                                    className='p-2 text-lg border border-primary rounded-3xl text-center font-light'
                                    secureTextEntry={true}
                                    maxLength={8}
                                    placeholder='Nova Senha'
                                    value={newPassword}
                                    onChangeText={ (txt)=>{setNewPassword(txt)} }
                                /> 
                            </View>
                            <View className='w-5/6 mt-5'>
                                <View className='absolute top-3 left-2'>
                                    <Feather name="lock" size={22} color="#FF5F00" />
                                </View>
                                <TextInput 
                                    className='p-2 text-lg border border-primary rounded-3xl text-center font-light'
                                    secureTextEntry={true}
                                    maxLength={8}
                                    placeholder='Nova Senha Novamente'
                                    value={againPassword}
                                    onChangeText={ (txt)=>{setAgainPassword(txt)} }
                                /> 
                            </View>
                        </View>
                        <View className='mt-10 items-center'>
                            <TouchableOpacity className='bg-primary w-5/6 items-center justify-center h-10 rounded-full'
                                onPress={handleSubmit}
                            >
                                <Text className='text-white font-bold text-lg'>
                                    Mudar a senha
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                :
                    <>
                        <View className='items-center mt-8'>
                            <Feather name="check-circle" size={24} color="#FF5F00" />
                            <Text className='text-xl font-bold text-primary'>
                                Senha Alterada !
                            </Text>
                            <Text className='font-light'>
                                Sua senha foi alterada com sucesso
                            </Text>
                        </View>
                        <View className='mt-10 items-center'>
                            <TouchableOpacity className='bg-primary h-10 items-center justify-center w-5/6 rounded-full'
                                onPress={backToLogin}
                            >
                                <Text className='font-bold text-white text-lg'>Acessar o app</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </View>
        </View>
    )
}