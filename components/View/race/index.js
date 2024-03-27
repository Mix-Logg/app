import { ScrollView, View, Text, Pressable, Alert } from "react-native";
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
    const [listen, setListen] = useState(null);
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment

    useEffect(() => {
        const SocketTeste = async () => {
            const socketIO = await io(URL);
            setSocket(socketIO);
            const allRace = await findAllRace();
            setRaces(allRace) 
        }
        SocketTeste();
    }, []);

    useEffect(() => {
        if(races != null){
            socket.on("updateStatus", (data) => { 
                checkRace(data);
            });
        }
    }, [socket, races]);

    useEffect(() => {
        console.log('traava')
        if(races != null){
            console.log('RACE NO MAP', races)
            const updatedAllraces = races.map(race => (
                <CardAllRace
                    key={race.id}
                    navigation={navigation}
                    id={race.id}
                    isVisible={race.isVisible}
                />
            ));
            setAllRace(updatedAllraces);
        }
    }, [races, listen]);

    const checkRace = async (id) => {
        console.log('click')
        const newRace = races
        console.log(races)
        const indexToUpdate = newRace.findIndex(race => race.id == id);
        newRace[indexToUpdate].isVisible = "1";
        console.log(newRace)
        setRaces(newRace)
        setListen(listen + 1)
        return
    }

    const handleIO = () => {
        console.log('btn')
        const data = {
            id:"1",
            isVisible:"1"
        }
        socket.emit('updateStatus', data); 
    }
    
    return(
        <>
            <FixBar navigation={navigation} opition={'race'} />
            <ScrollView style={twrnc`bg-white`}>
                { Allraces }
                <Pressable style={twrnc`mt-5 bg-green-500 py-5 items-center justify-center`}
                    onPress={()=>handleIO()}
                >
                    <Text style={twrnc`text-white text-base font-bold`}>Clique</Text>
                </Pressable>
            </ScrollView>
        </>
    )
}