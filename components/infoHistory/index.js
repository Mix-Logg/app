import { View, Text, Pressable, Linking } from "react-native"
import { AntDesign, Feather, Octicons, MaterialCommunityIcons  } from '@expo/vector-icons';
import twrnc from "twrnc"
import ModalBottom from "../modalBottom"
import Wating from "../wating";
import findOneRace from "../../hooks/findOneRace";
import findClient from "../../hooks/findClient";
import Mask from "../../hooks/mask";
import { useEffect, useState } from "react";
export default function InfoHistory({raceId}){
    const [ dateRace, setDateRace ] = useState(null)
    const [ dateClient, setDateClient ] = useState(null)

    const handleHelp = () => {
        const url = `https://wa.me/5511978612671`
        Linking.openURL(url);
    }

    function formatDate(dataHoraISO) {
        if(!dataHoraISO){
            return ''
        }
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
           console.log(race.confirmCodeInitial)
           setDateRace(race)
           setDateClient(client)
        }
        fetchData()
    },[])


    
    return(
        <ModalBottom>
            { dateRace && dateClient ?
                <View className="flex px-6">
                    <View>
                        <View className='gap-1 w-full'>
                            <Text className='text-2xl font-semibold text-primary'>
                                Detalhes do Frete
                            </Text>
                            <View className='flex flex-row items-center text-center w-fit'>
                                <AntDesign name="user" size={19} color="#737373" />
                                <Text className="text-[#737373] font-light text-lg mx-2">
                                    {dateClient.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className='mt-10'>
                        <View className='flex gap-8'>
                            <View className={`border-b border-[#d4d4d4] flex flex-row  items-start h-12`}>
                                <Feather name="clock" size={22} color="#FF5F00" />
                                <Text style={twrnc`text-[#737373] font-medium`}>
                                    {formatDate(dateRace.confirmCodeInitial)}
                                </Text>
                            </View>
                            <View className={`border-b border-[#d4d4d4] flex flex-row  items-start h-12`}>
                                <AntDesign name="dashboard" size={21} color="#FF5F00" />
                                <Text className={`text-[#737373] font-medium ml-3`}>{dateRace.km} km</Text>
                            </View>
                            <View className={`border-b border-[#d4d4d4] flex flex-col  items-start h-fit pb-4`}>
                                <View style={twrnc`flex-row items-end gap-3 px-1 items-center mb-3`}>
                                    <Octicons name="location" size={21} color="#FF5F00" />
                                    <Text style={twrnc`text-[#737373] font-medium w-5/6 `}>{dateRace.initial}</Text>
                                </View>
                                <View style={twrnc`flex-row items-end gap-3 px-1 items-center mb-2`}>
                                    <Feather name="flag" size={20} color="#FF5F00" />
                                    <Text style={twrnc`text-[#737373] font-medium w-5/6`}>{dateRace.finish}</Text>
                                </View>
                            </View>
                            <View className={`border-b border-[#d4d4d4] flex flex-row  items-start h-12`}>
                                <Text className={`text-green-600 font-bold text-xl`}> + {Mask('amount',dateRace.value)} reais</Text>
                            </View>
                        </View>
                    </View>
                    
                    <Pressable className={`flex-row items-center justify-center w-full h-fit mt-10`}
                        onPress={()=>handleHelp()}
                    >
                        <View className={`flex-row gap-4`}>
                            <MaterialCommunityIcons name="headset" size={24} color={'#a3a3a3'}  />
                            <Text className='font-bold text-neutral-400' >Pedir ajuda com este frete</Text>
                        </View>
                    </Pressable>

                </View> 
                :
                <Wating/>
            }
        </ModalBottom>
    )
}