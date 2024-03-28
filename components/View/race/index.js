import React from 'react';
import { ScrollView, View, Text, Pressable, Alert,  } from "react-native";
import { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import CardAllRace from "../../cardAllRace";
import { io } from 'socket.io-client';
import findAllRace from "../../../hooks/findAllRace";
import WaitRace from "../../awaitRace";
export default function Race({navigation}){
    const [Allraces, setAllRace] = useState(null);
    const [socket, setSocket] = useState(null);
    const [races, setRaces] = useState(null);
    const [listen, setListen] = useState(null);
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment

    useFocusEffect(
        React.useCallback(() => {
            const SocketTeste = async () => {
                const socketIO = await io(URL);
                setSocket(socketIO);
                const allRace = await findAllRace();
                setRaces(allRace) 
            }
            SocketTeste();
        }, [navigation])
    );

    useEffect(() => {
        if(races != null){
            socket.on("updateStatus", (data) => { 
                checkRace(data);
            });
        }
    }, [socket, races]);

    useEffect(() => {
        if(races != null){
            const updatedAllraces = races.map(race => (
                <CardAllRace
                    navigation={navigation}
                    id={race.id}
                    isVisible={'1'}
                />
            ));
            setAllRace(updatedAllraces);
        }
    }, [races, listen]);

    const checkRace = async (id) => {
        let uuid = id.toString();
        const newRace = races
        const indexToUpdate = newRace.findIndex(race => race.id == uuid);
        newRace[indexToUpdate].isVisible = "1";
        setRaces(newRace)
        setListen(listen + 1)
        return
    }
    
    return(
        <>
            <FixBar navigation={navigation} opition={'race'} />
            <ScrollView style={twrnc`bg-white`}>
                { races != null && races.length == 0 ?
                <WaitRace/>
                : 
                Allraces 
                }
            </ScrollView>
        </>
    )
}