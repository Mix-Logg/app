import { ScrollView, View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import CardAllRace from "../../cardAllRace";
import { io } from 'socket.io-client';
import findAllRace from "../../../hooks/findAllRace";
export default function Race({navigation}){
    const [Allraces, setAllRace] = useState(null);
    const [socket, setSocket] = useState(null);
    const [races, setRaces] = useState(null);
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment

    useEffect(() => {
        const SocketTeste = async () => {
            const socketIO = await io(URL);
            setSocket(socketIO);
            const race = await findAllRace();
            setRaces(race)
            socketIO.on("updateStatus", async (data) => { 
                // race {"id": "1"} 
                console.log('Notificação recebida:', data); 
                const updatedRaces = [...races];
                const index = updatedRaces.findIndex(race => race.id === data.id);
                if (index !== -1) {
                    // Modifica diretamente o parâmetro isVisible para 0
                    updatedRaces[index].isVisible = 0;
            
                    // Atualiza o estado do array de corridas com o novo array modificado
                    setRaces(updatedRaces);
                }
                console.log(updatedRaces);
            });
        }
        SocketTeste();
    }, []);


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
                { races != null &&
                    races.map(race => {
                        return <CardAllRace navigation={navigation} id={race.id} isVisible={race.isVisible} />
                    })
                }
                
                <Pressable style={twrnc`mt-5`}
                    onPress={
                        ()=>{handleIO()}
                    }
                >
                    <Text>Clique</Text>
                </Pressable>
            </ScrollView>
        </>
    )
}