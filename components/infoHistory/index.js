import { View, Text, Pressable, Linking } from "react-native"
import { AntDesign, MaterialIcons, Ionicons, Feather, Octicons } from '@expo/vector-icons';
import twrnc from "twrnc"
import ModalBottom from "../modalBottom"
import Wating from "../wating";
import findOneRace from "../../hooks/findOneRace";
import findClient from "../../hooks/findClient";
import { useEffect, useState } from "react";
export default function InfoHistory({raceId}){
    const [ dateRace, setDateRace ] = useState(null)
    const [ dateClient, setDateClient ] = useState(null)

    const handleHelp = () => {
        const url = `https://wa.me/5511978612671`
        Linking.openURL(url);
    }

    useEffect(()=>{
        const fetchData = async () => {
           const race = await findOneRace(raceId)
           const client = await findClient(race.idClient)
           setDateRace(race)
           setDateClient(client)
        }
        fetchData()
    },[])


    
    return(
        <ModalBottom>
            { dateRace && dateClient ?
                <View style={twrnc`py-5 gap-10`}>
                    <View>
                        <Text style={twrnc`text-2xl font-bold`}>
                            Informações avançadas
                        </Text>
                    </View>
                    <View style={twrnc`gap-4`}>
                        <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2'`}>
                            <AntDesign name="user" size={24} color="#FF5F00" />
                            <Text style={twrnc`text-[#737373] font-medium`}>{dateClient.name}</Text>
                        </View>
                        <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2'`}>
                            <MaterialIcons name="history-toggle-off" size={24} color="#FF5F00" />
                            <Text style={twrnc`text-[#737373] font-medium`}>17:38 segunda-feira</Text>
                        </View>
                        <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2'`}>
                            <Ionicons name="location-outline" size={24} color="#FF5F00" />
                            <Text style={twrnc`text-[#737373] font-medium`}>{dateRace.km} km</Text>
                        </View>
                        <View style={twrnc`border-b border-[#d4d4d4] gap-1`}>
                            <View style={twrnc`flex-row items-end gap-3 px-1 items-center`}>
                                <Octicons name="location" size={23} color="#FF5F00" />
                                <Text style={twrnc`text-[#737373] font-medium w-5/6 `}>{dateRace.initial}</Text>
                            </View>
                            <View style={twrnc`h-5 w-1 bg-[#FF5F00] mx-3 rounded-lg `}></View>
                            <View style={twrnc`flex-row items-end gap-3 px-1 items-center mb-2`}>
                                <AntDesign name="flag" size={23} color="#FF5F00" />
                                <Text style={twrnc`text-[#737373] font-medium w-5/6`}>{dateRace.finish}</Text>
                            </View>
                        </View>
                        <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2 px-1'`}>
                            <Text style={twrnc`text-green-600 font-bold text-base`}>+ R$ {dateRace.value} reais</Text>
                        </View>
                    </View>
                    <Pressable style={twrnc`flex-row items-end items-center justify-between`}
                        onPress={()=>handleHelp()}
                    >
                        <View style={twrnc`flex-row gap-3`}>
                            <AntDesign name="customerservice" size={24} color="#FF5F00" />
                            <Text style={twrnc`font-bold`}>Suporte</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </Pressable>
                </View> 
                :
                <Wating/>
            }
        </ModalBottom>
    )
}