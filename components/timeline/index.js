import { useEffect, useState } from "react";
import { View, Image,Text ,TextInput, Pressable, RefreshControl, ScrollView, Button   } from 'react-native';
import twrnc from 'twrnc';
import warningPicture from "../warningPicture";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import GetDelivery from "../../api/getDelivery";
export default function DocumentTimeline({navigation, status, plug}){
    const [info, setInfo] = useState(false); 
    const [txt, setTxt] = useState(false);
    const [analyze, setAnalyze] = useState(false); 
    const [aproved, setAproved] = useState(null);
    const [integration, setIntegration] = useState(null); 
    const handleAccess = () => {
        navigation.navigate('AvalidPhoto')
    }
    useEffect(() => {
        dataEffect = async () => {
            setInfo(status.picture)
            setTxt(status.txt)
            const delivery = await GetDelivery()
            if(delivery.cadastralStatus === '1'){
                setAnalyze(true)
            }
        }
        dataEffect()
    }, []); 
    
    return(
        <View style={twrnc`justify-center items-center mt-5`}>
            <FontAwesome5 name="clipboard-list" size={65} 
                style={twrnc`${info === 'reprove' ? 'text-red-500' : info === 'analyze' ? 'text-yellow-500' : 'text-green-600' }`} 
            />
            <Text style={twrnc`mt-2 font-bold`}>{txt}</Text>
            <View style={twrnc`mt-5`}>
                <Button title='Acesse' color="#FF5F00" onPress={handleAccess}/>
            </View>
            <View style={twrnc`mt-22 flex-row justify-center items-center gap-1`}>
                <View style={twrnc`justify-center items-center`}>
                    <Feather name="check-circle" size={38} style={twrnc`text-green-600`}/>
                    <Text style={twrnc`text-xs font-bold`}>Cadastrado</Text>
                </View>
                <View style={twrnc`h-1 w-8 bg-green-600 mb-3`}></View>
                <View style={twrnc`justify-center items-center `}>
                    {   analyze ?
                        <>
                            <Feather name="check-circle" size={38} style={twrnc`text-green-600`}/>
                            <Text style={twrnc`text-xs font-bold`}>Analisado</Text>
                        </>
                        :
                        <>
                            <MaterialIcons name="access-time" size={40} style={twrnc`text-yellow-500`} />
                            <Text style={twrnc`text-xs font-bold`}>Análise</Text>
                        </>
                    }
                </View>
                <View style={twrnc`h-1 w-8 ${ analyze === true ? 'bg-green-600' : 'bg-yellow-500'} mb-3`}></View>
                <View style={twrnc`justify-center items-center`}>
                    {   plug === 3 ?
                        <>
                            <Feather name="check-circle" size={38} style={twrnc`text-green-600`}/>
                            <Text style={twrnc`text-xs font-bold`}>Aprovado</Text>
                        </>
                        :
                        <>
                            <MaterialIcons name="access-time" size={40} style={twrnc` ${plug === 3 ? 'text-green-500' : 'text-yellow-500'}`} />
                            <Text style={twrnc`text-xs font-bold`}>Aprovado</Text>
                        </>
                    }
                </View>
                <View style={twrnc`h-1 w-8 mb-3 ${plug === 3 ? 'bg-green-600' : 'bg-yellow-500'} `}></View>
                <View style={twrnc`justify-center items-center`}>
                    <MaterialIcons name="access-time" size={40} style={twrnc`${plug === 4 ? 'text-green-500' : 'text-yellow-500'}`} />
                         <Text style={twrnc`text-xs font-bold`}>Integrado</Text>
                </View>
                </View>
        </View>
    )
}