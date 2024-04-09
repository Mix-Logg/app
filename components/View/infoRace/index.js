import FixBar from "../../fixBar";
import twrnc from "twrnc";
import { ScrollView, View, Text, Linking, Pressable, Image  } from "react-native";
import { MaterialIcons, Ionicons , AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import Button from "../../../util/button";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import findOneRace from "../../../hooks/findOneRace";
import ModalMid from "../../modalMid";
import Fly from '../../../img/uniqueIcons/fly.png'
import FindClient from "../../../hooks/findClient";
export default function InfoRace({navigation}){
    const [socket,setSocket] = useState(null)
    const [modal,setModal] = useState(null)
    const [price,setPrice] = useState(null)
    const [initial,setInitial] = useState(null)
    const [finish,setFinish] = useState(null)
    const [km,setKm] = useState(null)
    const [clientName,setClientName] = useState('carregando...')
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLproduction
    const route = useRoute();

    useEffect(()=>{
        const socketIO = io(URL);
        setSocket(socketIO);
    },[])

    useEffect( ()=>{
        const dataUseEffect = async () => {
            const client = await FindClient(route.params.idClient);
            route.params.name = client.name;
            route.params.phone = client.phone;
            setClientName(client.name)
            setPrice(route.params.price)
            setInitial(route.params.initial)
            setFinish(route.params.finish)
            setKm(route.params.km)
        }
        dataUseEffect()
    },[])

    const handleRace = async () => {
        const infoRace = await findOneRace(route.params.id);
        if(infoRace.isVisible == '0'){
            await setModal('')
            moodalRedirect()
            return 
        }
        const data = {
            id: route.params.id,
            isVisible: "0"
        }
        socket.emit('updateStatus', data);
        AsyncStorage.setItem('raceId', route.params.id.toString());
        navigation.navigate('Work');
    }

    const handleBack = async () => {
        navigation.navigate('Race')
    }

    const moodalRedirect = () => {
        setModal(
        <ModalMid>
            <View style={twrnc`w-full bg-[#FF5F00] p-1 rounded-lg`}>
                <View style={twrnc`flex-row px-5 bg-white rounded-lg`}>
                    <View style={twrnc`w-1/2 py-3 gap-3`}>
                        <View>
                            <Text style={twrnc`text-lg font-bold text-[#FF5F00]`}>OPS!</Text>
                        </View>
                        <View style={twrnc`gap-5`}>
                            <Text style={twrnc`text-neutral-500`}>Alguém já iniciou esse frete</Text>
                            <Text style={twrnc`text-base font-medium text-neutral-500`}>Não desanime, precisamos de você</Text>
                        </View>
                    </View>
                    <View style={twrnc`w-1/2 items-center justify-center`}>
                        <View style={twrnc`h-50 w-50`}>
                            <Image 
                                style={twrnc`h-full w-full`}
                                source={Fly}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
                <View style={twrnc`bg-[#FF5F00] rounded`}>
                    <Button handle={handleBack}>
                        <View style={twrnc`bg-[#FF5F00] w-full justify-center items-center`}>
                            <Text style={twrnc`text-base font-bold text-white`}>Continuar voando</Text>
                        </View>
                    </Button>
                </View>
            </View>
        </ModalMid>
        )
    }

    return(
        <>
            {modal}
            <FixBar navigation={navigation} opition={'infoRace'} />
            <ScrollView style={twrnc`bg-white h-full`}>
                <View style={twrnc`px-5 py-5 gap-2`}>
                    <Text style={twrnc`text-2xl font-bold`}>Informações do frete</Text>
                </View>
                <View style={twrnc`mt-10 px-5`}>
                    <View style={twrnc` px-2 py-3 gap-3`}>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <AntDesign name="user" size={20} color="#FF5F00" /> 
                            <Text style={twrnc``}>{clientName}</Text>
                        </View>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <SimpleLineIcons name="location-pin" size={20} color="#FF5F00" />
                            <Text style={twrnc``}>Está a 4 km de distância</Text>
                        </View>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <AntDesign name="flag" size={20} color="#FF5F00" />
                            <Text style={twrnc``}>O frete possui {km} km</Text>
                        </View>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <Text style={twrnc`text-green-600 font-bold text-base`}>R$ {price} reais</Text>
                        </View>
                    </View>
                </View>
                <View style={twrnc`mt-20 px-10`}>
                    <View style={twrnc``}> 
                        <Button background={'bg-[#FF5F00]'} handle={handleRace}> 
                           <Text style={twrnc`text-base text-white font-bold py-2`}>Inciar frete </Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}