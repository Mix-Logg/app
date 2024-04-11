import React from 'react';
import { ScrollView, View, Text, Pressable, Alert, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import CardAllRace from "../../cardAllRace";
import { io } from 'socket.io-client';
import findAllRace from "../../../hooks/findAllRace";
import findAllRaceOpen from '../../../hooks/findAllOpenRace';
import WaitRace from "../../awaitRace";
export default function Race({navigation}){
    const [Allraces, setAllRace] = useState(null);
    const [socket, setSocket] = useState(null);
    const [races, setRaces] = useState(null);
    const [listen, setListen] = useState(null);
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLproduction

    useFocusEffect(
        React.useCallback(() => {
            const Socket = async () => {
                const socketIO = await io(URL);
                const allRace  = await findAllRaceOpen();
                setSocket(socketIO);
                setRaces(allRace);
            }
            Socket();
        }, [navigation])
    );

    useEffect(() => {
        if(races != null){
            socket.on("updateStatus", (data) => { 
                checkRace(data);
            });
            socket.on("NewRace", (data) => { 
                newRace(data)
            });
        }
    }, [socket, races]);

    useEffect(() => {
        if(races != null){
            const updatedAllraces = races.map(race => (
                <CardAllRace
                    navigation={navigation}
                    key={race.id}
                    id={race.id}
                    idClient={race.idClient}
                    isVisible={race.isVisible}
                    price={race.value}
                    initial={race.initial}
                    finish={race.finish}
                    km={race.km}
                />
            ));
            setAllRace(updatedAllraces);
        }
    }, [listen, races]);

    const checkRace = async (id) => {
        let uuid = id.toString();
        const newRace = races
        const indexToUpdate = newRace.findIndex(race => race.id == uuid);
        newRace[indexToUpdate].isVisible = "0";
        setRaces(newRace)
        setListen(listen + 1)
        return
    }
    
    const newRace = async (race) => {
        const newRace = {
            key:race.idRace,
            id:race.idRace,
            idClient:race.idClient,
            isVisible:race.isVisible,
            value:race.value,
            initial:race.initial,
            finish:race.finish,
            km:race.km
        };
        const updatedRaces = [...races, newRace];
        setRaces(updatedRaces);
    }

    // const teste = async () => {
    //     await socket.emit("createRace", {
    //         key:race.idRace,
    //         id:race.idRace,
    //         idClient:race.idClient,
    //         isVisible:race.isVisible,
    //         value:race.value,
    //         initial:race.initial,
    //         finish:race.finish,
    //         km:race.km
    //       });
    // }

    return(
        <>
            <FixBar navigation={navigation} opition={'race'} />
            <ScrollView style={twrnc`bg-white`}>
                { races != null && races.length == 0 ?
                <WaitRace/>
                : 
                <>
                    {/* <TouchableOpacity style={twrnc`border py-5 items-center`}
                        onPress={()=>teste()}
                    >
                        <Text>EMITIR CORRIDA</Text>
                    </TouchableOpacity> */}
                    {Allraces} 
                </>
                }
            </ScrollView>
        </>
    )
}