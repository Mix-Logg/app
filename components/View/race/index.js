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
import Wating from '../../wating';
import AllStorage from '../../../hooks/findAllStorage';
export default function Race({navigation}){
    const [Allraces, setAllRace] = useState(null);
    const [socket, setSocket] = useState(null);
    const [races, setRaces] = useState(null);
    const [listen, setListen] = useState(null);
    const [listenOn, setListenOn] = useState(null);
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.10:8080/'
    const URL = URLproduction

    useFocusEffect(
        React.useCallback(() => {
            const Socket = async () => {
                const allRace  = await findAllRaceOpen();
                setRaces(allRace);
                const socketIO = io(URL);
                setSocket(socketIO);
            }
            Socket();
        }, [navigation])
    );

    useEffect(() => {
        if(socket != null){
            
            socket.on("updateStatus", (data) => { 
                checkRace(data);
            });
            socket.on("NewRace", (data) => { 
                newRace(data)
            });
        }
    }, [socket]);

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

    const checkRace = async (response) => {
        console.log(response.id)
        let uuid = response.id.toString();
        const newRace = races
        const indexToUpdate = newRace.findIndex(race => race.id == uuid);
        if( indexToUpdate >= 0 ){
            newRace[indexToUpdate].isVisible = response.isVisible;
            setRaces(newRace)
            setListen(listen + 1)
        }
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

    const teste = async () => {
        const storage = await AllStorage()
        socket.emit('driverCancel', {idRace:545, am:storage.am, uuid:parseInt(storage.uuid)} );
    }

    return(
        <>
            <FixBar navigation={navigation} opition={'race'} />
            { races && socket ?
                <ScrollView style={twrnc`bg-white`}>
                { races.length == 0  ?
                <>
                    {/* <WaitRace/> */}
                    <View className='mt-5 items-center justify-center'>
                        <TouchableOpacity className='border p-2 rounded'
                            onPress={teste}
                        >
                            <Text>TESTE</Text>
                        </TouchableOpacity>
                    </View>
                </>
                    : 
                <>
                    {Allraces}
                    <View className='mt-5 items-center justify-center'>
                        <TouchableOpacity className='border p-2 rounded'
                            onPress={teste}
                        >
                            <Text>TESTE</Text>
                        </TouchableOpacity>
                    </View>
                </>
                }
                </ScrollView>
                    :
                <Wating/>
            }
        </>
    )
}