import { ScrollView, View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import CardAllRace from "../../cardAllRace";
import { io } from 'socket.io-client';
export default function Race({navigation}){

    const [socket, setSocket] = useState(null);
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLproduction

    useEffect(() => {
        const SocketTeste = async () => {
            const socketIO = await io(URL);
            socketIO.on("updateStatus", (data) => { 
                console.log('Notificação recebida:', data); 
            });
            setSocket(socketIO)
        }
        SocketTeste()
        
    }, []);

    // useEffect(()=> {
    //     socket.on("updateStatus", (data) => { console.log('Notificação recebida:', data); });
    // },[])


    const handleIO = () => {
        const data = {
            id:"1",
            isVisible:"0"
        }
        socket.emit('updateStatus', data); 
    }
    
    return(
        <>
            <FixBar navigation={navigation} opition={'race'} />
            <ScrollView style={twrnc`bg-white`}>
                {/* <View style={twrnc`h-full p-5 gap-8`}>
                    <View style={twrnc`border-b border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-2 items-center`}>
                            <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            <View>
                                <Text style={twrnc`font-bold text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-2 items-center`}>
                            <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            <View>
                                <Text style={twrnc`font-bold text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-2`}>
                            <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />

                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                </View> */}
                <CardAllRace navigation={navigation} />
                <Pressable style={twrnc`mt-5`}
                    onPress={()=>{handleIO()}}
                >
                    <Text>Clique</Text>
                </Pressable>
            </ScrollView>
        </>
    )
}