import twrnc from 'twrnc';
import { View, Image,Text , TouchableOpacity, StatusBar  } from 'react-native';
import { useEffect, useState } from 'react';
import { AntDesign, Octicons, FontAwesome5, MaterialCommunityIcons, Feather  } from '@expo/vector-icons';
import Wallet from '../../img/icons/Wallet.png'
import Race from '../../img/icons/box.png'
import History from '../../img/icons/Reload.png'

export default function FixBar({navigation, opition, color = null}){
    
    const [title,setTitle] = useState('')
    const [back,setBack] = useState('')

    const handleBack = () => {
        if(opition === 'register'){
            navigation.goBack();
        }else{
            navigation.navigate(back)
        }
    }

    useEffect(() => {
        dataEffect = async () => {
            switch (opition) {
                case 'profile':
                    setTitle('Perfil')
                    setBack('Home')
                    break;
                case 'avalidPhoto':
                    setTitle('Situação Cadastral')
                    setBack('Profile')
                    break;
                case 'register':
                    setTitle('Cadastro')
                    setBack('Profile')
                    break
                case 'changePassword':
                    setTitle('Mudar senha')
                    setBack('Profile')
                    break
                case 'allAccess':
                    setTitle('Todos acessos')
                    setBack('Home')
                    break
                case 'wallet':
                    setTitle('Carteira')
                    setBack('Home')
                    break
                case 'history':
                    setTitle('Histórico')
                    setBack('Home')
                    break
                case 'race':
                    setTitle('Fretes')
                    setBack('Home')
                    break;
                case 'infoRace':
                    setTitle('Informações')
                    setBack('Race')
                    break;
                case 'operation':
                    setTitle('Operação')
                    setBack('Home')
                    break;
                default:
                    break;
            }
        }
        dataEffect()
    }, []);

    return(
        <View style={[twrnc` ${color ? 'bg-[#FF5F00]' : 'bg-[#FF5F00]'} flex flex-row items-center w-full justify-between py-1 px-5`,{height:'7%'}]}>
           <TouchableOpacity style={twrnc`flex flex-row h-full items-center justify-start`}
            onPress={handleBack}
           >
                <View>
                    <AntDesign name="left" size={16} color="white" />
                </View>
                <Text className='ml-3 text-white'>Voltar</Text>
            </TouchableOpacity>

            <View style={twrnc`flex flex-row h-full items-center justify-end mr-2`}>
                    <View style={twrnc`flex flex-row items-center justify-center`}>
                        { opition === 'profile' ? <FontAwesome5 name="user-circle" size={18} color="white" /> 
                        : opition === 'avalidPhoto' ? <FontAwesome5 name="clipboard-list" size={18} color="white" />
                        : opition === 'register' ? <AntDesign name="adduser" size={18} color="white" /> 
                        : opition === 'changePassword' ? <Octicons name="key" size={18} color="white" />
                        : opition === 'allAccess' ? <MaterialCommunityIcons name="door" size={20} color="white" />
                        : opition === 'wallet' ? <View style={twrnc`w-4 h-4 `}><Image style={twrnc`w-full h-full`} resizeMode='contain' source={Wallet} tintColor={color ? 'white' : 'text-white'}/></View>
                        : opition === 'race' ? <View style={twrnc`w-4 h-4 `}><Image style={twrnc`w-full h-full`} resizeMode='contain' source={Race} tintColor={'white'}/></View>
                        : opition === 'history' ? <View style={twrnc`w-4 h-4 `}><Image style={twrnc`w-full h-full`} resizeMode='contain' source={History} tintColor={'white'}/></View>
                        : opition === 'infoRace' ? <MaterialCommunityIcons name="car-info" size={20} color="white" />
                        : opition === 'operation' ? <Feather name="truck" size={20} color="white" />
                        : null }
                        <Text style={twrnc`${color ? 'text-white' : 'text-white'} text-sm font-medium`}> {title} </Text>
                    </View>
            </View>
        </View>
    )
}