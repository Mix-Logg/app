import twrnc from 'twrnc';
import { View, Image,Text , Pressable, StatusBar  } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
export default function FixBar({navigation, opition}){
    
    const [title,setTitle] = useState('')
    const [back,setBack] = useState('')

    const handleBack = () => {
        navigation.navigate(back)
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
                default:
                    break;
            }
        }
        dataEffect()
    }, []);

    return(
        <View style={[twrnc`bg-[#EFEFEF] flex flex-row items-center w-full justify-between py-1 px-5`,{height:'7%'}]}>
           <Pressable style={twrnc`flex flex-row h-full items-center justify-start`}
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
            </Pressable>

            <View style={twrnc`flex flex-row h-full items-center justify-end mr-2`}>
                    <View style={twrnc`flex flex-row`}>
                        { opition === 'profile' ? <FontAwesome5 name="user-circle" size={18} color="#7B7B7B" /> 
                        : opition === 'avalidPhoto' ? <FontAwesome5 name="clipboard-list" size={18} color="#7B7B7B" />
                        : null }
                        <Text style={twrnc`text-[#7B7B7B] text-sm font-medium`}> {title} </Text>
                    </View>
            </View>
        </View>
    )
}