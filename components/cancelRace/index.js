import twrnc from "twrnc";
import ModalMid from "../modalMid"
import Delivery from '../../img/uniqueIcons/delivery.png'
import { View, Text, Image, Linking, BackHandler } from "react-native"
import { io } from 'socket.io-client';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Button from "../../util/button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllStorage from "../../hooks/findAllStorage";
export default function CancelRace({setModalCancel}){
    const [socket, setSocket] = useState(null);
    const navigation = useNavigation()
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    
    const handleContinue = () => {
        setModalCancel('')
    }

    const handleCancel = async () => {
        const storage = await AllStorage()
        socket.emit('driverCancel', {idRace:parseInt(storage.raceId), am:storage.am, uuid:parseInt(storage.uuid)} );
        setModalCancel('')
        await AsyncStorage.removeItem('raceId');
        navigation.navigate('Home')
        return
    }

    useEffect(()=>{
        const Socket = async () => {
            const socketIO = io(URL);
            setSocket(socketIO);
        }
        Socket();
    },[])
    
    
    return(
        <ModalMid>
            <View style={twrnc`h-50 bg-[#FF5F00] rounded-lg`}>
                <View style={twrnc`bg-white flex-row rounded-t-lg `}>
                    <View style={twrnc`w-1/2 p-3 gap-5 `}>
                        <View>
                            <Text style={twrnc`text-2xl font-bold text-[#FF5F00]`}>Ei !</Text>
                            <Text style={twrnc`font-medium`}>
                                precisamos de você, evite cancelar os fretes
                            </Text>
                        </View>
                        <View style={twrnc`gap-3`}>        
                            <Button handle={handleCancel} background={'bg-[#d4d4d4]'}>
                                <Text style={twrnc`text-base font-medium text-white`}>Cancelar</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={twrnc`w-1/2`}>
                        <Image 
                            source={Delivery}
                            style={twrnc`h-full w-full`}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View style ={twrnc`w-full bg-[#FF5F00] rounded-b-lg`}>
                    <Button handle={handleContinue} background={'bg-[#FF5F00]'}>
                        <Text style={twrnc`text-lg font-medium text-white`}>Continuar frete</Text>
                    </Button>
                </View>
            </View>
        </ModalMid>
    )
}