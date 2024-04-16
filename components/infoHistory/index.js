import { View, Text, Pressable, Linking } from "react-native"
import { AntDesign, MaterialIcons, Ionicons, Feather, Octicons, SimpleLineIcons } from '@expo/vector-icons';
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

    function formatDate(dataHoraISO) {
        // Array com os nomes dos meses em português
        const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
      
        // Quebrando a string
        const partes = dataHoraISO.split('T');
        const data = partes[0].split('-');
        const hora = partes[1].split(':');
      
        // Extraindo e formatando as partes
        const ano = data[0];
        const mesIndex = parseInt(data[1]) - 1; // Subtraindo 1 porque os meses em JavaScript são indexados em 0
        const mes = meses[mesIndex];
        const dia = data[2].padStart(2, '0');
        const horas = hora[0].padStart(2, '0');
        const minutos = hora[1].padStart(2, '0');
        const segundos = hora[2];
        const fusoHorario = 'UTC';
      
        // Formatando a data e hora
        const dataFormatada = `dia ${dia} de ${mes} de ${ano} às ${horas}:${minutos}`;
      
        return dataFormatada;
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
                        <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2`}>
                            <AntDesign name="user" size={24} color="#FF5F00" />
                            <Text style={twrnc`text-[#737373] font-medium`}>{dateClient.name}</Text>
                        </View>
                        <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2 `}>
                            <Feather name="clock" size={22} color="#FF5F00" />
                            <Text style={twrnc`text-[#737373] font-medium`}>{formatDate(dateRace.confirmCodeInitial)}</Text>
                        </View>
                        <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2`}>
                            <AntDesign name="dashboard" size={21} color="#FF5F00" />
                            <Text style={twrnc`text-[#737373] font-medium`}>{dateRace.km} km</Text>
                        </View>
                        <View style={twrnc`border-b border-[#d4d4d4] gap-1`}>
                            <View style={twrnc`flex-row items-end gap-3 px-1 items-center`}>
                                <AntDesign name="enviromento" size={22} color="#ff5f00" />
                                <Text style={twrnc`text-[#737373] font-medium w-5/6 `}>{dateRace.initial}</Text>
                            </View>
                            <View style={twrnc`h-5 w-1 bg-[#FF5F00] mx-3 rounded-lg`}></View>
                            <View style={twrnc`flex-row items-end gap-3 px-1 items-center mb-2`}>
                                <AntDesign name="flag" size={21} color="#FF5F00" />
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