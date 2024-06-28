import twrnc from "twrnc";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { FontAwesome6, Feather  } from '@expo/vector-icons';
import FixBar from "../fixBar";
import Reload from '../../img/icons/Reload.png'
import Wallet from '../../img/icons/Wallet.png'
import Road from '../../img/icons/box.png'
export default function AllAccess({navigation}) {
    const handleAllAcess = (route) => {
        switch (route) {
            case 'all':
                navigation.navigate('AllAccess')
                break;
            case 'wallet':
                navigation.navigate('Wallet')
                break;
            case 'history':
                navigation.navigate('History')
                break;
            case 'race':
                navigation.navigate('Race')
                break;
            case 'profile':
                navigation.navigate('Profile')
                break;
            default:
                break;
        }
    }

    return(
        <>
        <FixBar navigation={navigation} opition={'allAccess'} />
        <View className='h-full bg-white'>
            <View className={`mt-10 h-fit`}>
                <ScrollView horizontal>
                    <View className='flex-row w-full items-start justify-center mb-3'>
                        <View style={twrnc`items-center justify-center px-5 gap-1`}>
                            <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl`}
                                onPress={()=>handleAllAcess('profile')}
                            >
                                <FontAwesome6 name="user" size={28} color="#FF5F00" />
                            </TouchableOpacity>
                            <Text style={twrnc`text-[#7B7B7B]`}>Perfil </Text>
                        </View>
                        <View style={twrnc`items-center justify-center px-5 gap-1`}>
                            <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl`}
                                onPress={()=>handleAllAcess('wallet')}
                            >
                                <Image 
                                    source={Wallet}
                                    style={twrnc`h-8 w-8`}
                                />
                            </TouchableOpacity>
                            <Text style={twrnc`text-[#7B7B7B]`}>Carteira </Text>
                        </View>
                        <View style={twrnc`items-center justify-center px-5 gap-1`}>
                            <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl `}
                                onPress={()=>handleAllAcess('history')}
                            >
                                <Image 
                                    source={Reload}
                                    style={twrnc`h-7 w-7`}
                                />
                            </TouchableOpacity>
                            <Text style={twrnc`text-[#7B7B7B]`} >Histórico </Text>
                        </View>
                        <View style={twrnc`items-center justify-center px-5 gap-1`}>
                            <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl `}
                                onPress={()=>handleAllAcess('race')}
                            >
                                <Image 
                                    source={Road}
                                    style={twrnc`h-8 w-8`}
                                />
                            </TouchableOpacity>
                            <Text style={twrnc`text-[#7B7B7B]`} >Fretes </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View className={`mt-10 h-fit`}>
                <ScrollView horizontal>
                    <View className='flex-row w-full items-start justify-center mb-3'>
                        <View style={twrnc`items-center justify-center px-5 gap-1`}>
                            <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl`}
                                onPress={()=>handleAllAcess('profile')}
                            >
                                <Feather name="truck" size={30} color="#FF5F00" />
                            </TouchableOpacity>
                            <Text style={twrnc`text-[#7B7B7B]`}>Operação</Text>
                        </View>
                        {/* <View style={twrnc`items-center justify-center px-5 gap-1`}>
                            <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl`}
                                onPress={()=>handleAllAcess('wallet')}
                            >
                                <Image 
                                    source={Wallet}
                                    style={twrnc`h-8 w-8`}
                                />
                            </TouchableOpacity>
                            <Text style={twrnc`text-[#7B7B7B]`}>Carteira </Text>
                        </View>
                        <View style={twrnc`items-center justify-center px-5 gap-1`}>
                            <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl `}
                                onPress={()=>handleAllAcess('history')}
                            >
                                <Image 
                                    source={Reload}
                                    style={twrnc`h-7 w-7`}
                                />
                            </TouchableOpacity>
                            <Text style={twrnc`text-[#7B7B7B]`} >Histórico </Text>
                        </View>
                        <View style={twrnc`items-center justify-center px-5 gap-1`}>
                            <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl `}
                                onPress={()=>handleAllAcess('race')}
                            >
                                <Image 
                                    source={Road}
                                    style={twrnc`h-8 w-8`}
                                />
                            </TouchableOpacity>
                            <Text style={twrnc`text-[#7B7B7B]`} >Fretes </Text>
                        </View> */}
                    </View>
                </ScrollView>
            </View>
        </View>
        </>

    )
}