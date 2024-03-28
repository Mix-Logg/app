import twrnc from 'twrnc';
import { View, Image,Text , TouchableOpacity, StatusBar  } from 'react-native';
import { useEffect, useState } from 'react';
import { AntDesign, Octicons, FontAwesome5, MaterialCommunityIcons  } from '@expo/vector-icons';
import Wallet from '../../img/icons/Wallet.png'
import Race from '../../img/icons/box.png'
import History from '../../img/icons/Reload.png'

export default function FixBar({navigation, opition}){
    
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
                default:
                    break;
            }
        }
        dataEffect()
    }, []);

    return(
        <View style={[twrnc`bg-[#EFEFEF] flex flex-row items-center w-full justify-between py-1 px-5`,{height:'7%'}]}>
           <TouchableOpacity style={twrnc`flex flex-row h-full items-center justify-start`}
            onPress={handleBack}
           >
                <View style={twrnc`w-2/8 h-3/6`}>
                        <Image 
                            source={require('../../img/icons/arrowLeft.png')}
                            resizeMode="contain"
                            style={{ width: '100%', height:'100%', tintColor:'#7B7B7B' }}
                        />
                    </View>
                    <Text style={twrnc`text-[#7B7B7B] text-sm font-medium`}> voltar</Text>
            </TouchableOpacity>

            <View style={twrnc`flex flex-row h-full items-center justify-end mr-2`}>
                    <View style={twrnc`flex flex-row items-center justify-center`}>
                        { opition === 'profile' ? <FontAwesome5 name="user-circle" size={18} color="#7B7B7B" /> 
                        : opition === 'avalidPhoto' ? <FontAwesome5 name="clipboard-list" size={18} color="#7B7B7B" />
                        : opition === 'register' ? <AntDesign name="adduser" size={18} color="#7B7B7B" /> 
                        : opition === 'changePassword' ? <Octicons name="key" size={18} color="#7B7B7B" />
                        : opition === 'allAccess' ? <MaterialCommunityIcons name="door" size={20} color="#7B7B7B" />
                        : opition === 'wallet' ? <View style={twrnc`w-4 h-4 `}><Image style={twrnc`w-full h-full`} resizeMode='contain' source={Wallet} tintColor={'#7B7B7B'}/></View>
                        : opition === 'race' ? <View style={twrnc`w-4 h-4 `}><Image style={twrnc`w-full h-full`} resizeMode='contain' source={Race} tintColor={'#7B7B7B'}/></View>
                        : opition === 'history' ? <View style={twrnc`w-4 h-4 `}><Image style={twrnc`w-full h-full`} resizeMode='contain' source={History} tintColor={'#7B7B7B'}/></View>
                        : opition === 'infoRace' ? <MaterialCommunityIcons name="car-info" size={20} color="#7B7B7B" />
                        : null }
                        <Text style={twrnc`text-[#7B7B7B] text-sm font-medium`}> {title} </Text>
                    </View>
            </View>
        </View>
    )
}