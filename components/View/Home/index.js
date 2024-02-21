import { useState, useEffect } from 'react';
import { View, Image,Text ,TextInput, Pressable, RefreshControl, ScrollView, Button   } from 'react-native';
import Bar from '../../bar';
import warningPicture from '../../warningPicture';
import twrnc from 'twrnc';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
export default function Home ({navigation}){
    const [refreshing, setRefreshing] = useState(false); 
    const [info, setInfo] = useState(false); 
    const [txt, setTxt] = useState(false); 
    const onRefresh = () => {
        setRefreshing(true);
    };
    const handleAccess = () => {
        navigation.navigate('AvalidPhoto')
    }
    useEffect(() => {
        dataEffect = async () => {
            const info = await warningPicture()
            setInfo(info.picture)
            setTxt(info.txt)
            setRefreshing(false)
        }
        dataEffect()
    }, [refreshing]);
    
    return(
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={twrnc`flex h-200 bg-[#F4F4F4]`}>
                <Bar navigation={navigation} />
                { info === 'analyze' || info === 'reprove' ?
                    <View style={twrnc`justify-center items-center mt-5`}>
                        <FontAwesome5 name="clipboard-list" size={65} 
                        style={twrnc`${info === 'reprove' ? 'text-red-500' : info === 'analyze' ? 'text-yellow-500' : '' }`} />
                        <Text style={twrnc`mt-2 font-bold`}>{txt}</Text>
                        <View style={twrnc`mt-5`}>
                            <Button title='Acesse' color="#FF5F00" onPress={handleAccess}/>
                        </View>
                        <View style={twrnc`mt-22 flex-row justify-center items-center gap-1`}>
                            <View style={twrnc`justify-center items-center`}>
                                <Feather name="check-circle" size={38} style={twrnc`text-green-600`}/>
                                <Text style={twrnc`text-xs`}>Cadastrado</Text>
                            </View>
                            <View style={twrnc`h-1 w-8 bg-green-600 mb-3`}></View>
                            <View style={twrnc`justify-center items-center `}>
                                <MaterialIcons name="access-time" size={40} style={twrnc`text-yellow-500`} />
                                <Text style={twrnc`text-xs`}>Análise</Text>
                            </View>
                            <View style={twrnc`h-1 w-8 bg-yellow-500 mb-3`}></View>
                            <View style={twrnc`justify-center items-center`}>
                                <MaterialIcons name="access-time" size={40} style={twrnc`text-yellow-500`} />
                                <Text style={twrnc`text-xs`}>Aprovado</Text>
                            </View>
                            <View style={twrnc`h-1 w-8 bg-yellow-500 mb-3`}></View>
                            <View style={twrnc`justify-center items-center`}>
                                <MaterialIcons name="access-time" size={40} style={twrnc`text-yellow-500`} />
                                <Text style={twrnc`text-xs`}>Integrado</Text>
                            </View>
                        </View>
                    </View> 
                    : 
                    <View>
                        <Text> APROVADO E EM OPERAÇÃO! </Text>
                    </View>
                }
            </View>
        </ScrollView>
      
    )
}