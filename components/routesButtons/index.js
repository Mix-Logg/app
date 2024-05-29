import { FontAwesome5, Ionicons, Octicons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { TouchableOpacity, Linking, Text, View, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import People from '../../img/uniqueIcons/people.png'
import Delivery from '../../img/uniqueIcons/delivery.png'
import twrnc from 'twrnc';
import { useEffect, useState } from 'react';
import findOneRace from '../../hooks/findOneRace';
export default function RoutesButtons({code}){
    const [race, setRace] = useState('')
    const [route, setRoute] = useState('')
    const [step, setStep] = useState('')

    const openWaze = () => {
    // Aqui faça a lógica do seu endereço depois das confirmações     
     const startAddress = route;
     const wazeUrl = `https://www.waze.com/ul?q=${startAddress}&navigate=yes`;
 
     Linking.openURL(wazeUrl).catch((err) =>
       console.error("Erro ao abrir o Waze: ", err)
     );
    };

    const openGoogleMaps = () => {
        const address = route; // Endereço com número
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    
        Linking.openURL(googleMapsUrl)
            .then(() => console.log('Google Maps aberto com sucesso'))
            .catch((err) => console.error("Erro ao abrir o Google Maps: ", err));
    };

    useEffect(()=>{
        const fetchData = async () => {
            const raceId = await AsyncStorage.getItem('raceId')
            const race = await findOneRace(raceId)
            setRace(race)
            if(race.confirmCodeInitial == null){
                setRoute(race.initial)
                setStep('initial')
                return
            }
            setStep('finish')
            setRoute(race.finish)
        }
        fetchData()
    },[code])
    return(
        <View className="">
            <View style={twrnc`h-50 bg-[#EFEFEF] rounded-b-3xl items-center p-5`}>
               <View className=" rounded-xl w-5/6 bg-white">
                    <Image
                        source={People}
                        resizeMode="contain"
                        className='w-full h-full'
                    />
               </View>
            </View>
            <View className="bg-white px-5 py-2">
                <Text className="text-lg font-light text-neutral-400">
                    Nosso mapa está em desenvolvimento, recomendamos utilizar o Waze ou Google para chegar ao local.
                </Text>
                <Text className="justify-end font-bold">
                    Clique no <Ionicons name="eye" size={15} color='#FF5F00' /> para mais informações do frete.
                </Text>
            </View>
            <View className="p-5 gap-5">
                <View className=" flex-row items-center">
                    <Octicons name="location" size={20} color="#FF5F00" />
                    <Text className="ml-2 w-5/6">{route}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        className="flex-row items-center bg-[#FF5F00] p-3 rounded-xl justify-center"
                        onPress={openWaze}
                    >
                        <View className="flex-row w-1/2 items-center">
                            <FontAwesome5 name="waze" size={24} color="#f0f9ff" />
                            <Text className="ml-3 font-bold text-sky-50">
                                Abrir no Waze
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-row items-center bg-[#FF5F00] p-3 rounded-xl justify-center mt-3"
                        onPress={openGoogleMaps}
                    >
                        <View className="flex-row w-1/2 items-center">
                            <MaterialCommunityIcons name="google-maps" size={27} color="#f0f9ff" />
                            <Text className="ml-2 font-bold text-sky-50">
                                Abrir no GoogleMaps
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}