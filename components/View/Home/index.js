import React from 'react';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Image,Text ,TextInput, Pressable, RefreshControl, ScrollView, Button, SafeAreaView, StatusBar, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bar from '../../bar';
import warningPicture from '../../warningPicture';
import twrnc from 'twrnc';
import DocumentTimeline from '../../timeline';
import Plug from '../../../api/plug';
import Races from '../../races';
import Access from '../../access';
import Balance from '../../balance';
import Banner from '../../banner';
import GetDelivery from '../../../api/getDelivery';
import findUser from '../../../hooks/findUser';
import AllStorage from '../../../hooks/findAllStorage';
import UpdateUser from '../../../hooks/updateUser';
import LocationDenied from '../../locationDenied';
import GetVehicle from '../../../api/getVehicle';
import RegisterWallet from '../../../hooks/registerWallet';
export default function Home ({navigation}){
    const [refreshing, setRefreshing] = useState(false); 
    const [info, setInfo] = useState(false); 
    const [timeLineView, setTimeLineView] = useState('');
    const [plug, setPlug] = useState('');
    const [modalMid, setModalMid] = useState('')
    const onRefresh = () => {
        setRefreshing(true);
    };
    const timeLine = (info,plug) => {
        return new Promise((resolve, reject) => {
            setTimeLineView('')
            setTimeLineView(<DocumentTimeline navigation={navigation} status={info} plug={plug.timeline}/>);
            resolve();
        });
    }; 
    useEffect(()=>{
        fetchData = async () => {
            const storage = await AllStorage();
            if(storage.vehicle){
                return
            }
            const vehicle = await GetVehicle();
            await AsyncStorage.setItem('vehicle', vehicle.type);
        }
        fetchData()
    },[]) 
    useEffect(()=>{
        const fetchData = async () => {
            const raceId = await AsyncStorage.getItem('raceId')
            if(raceId){
                navigation.navigate('Work')
            }
        }
        fetchData()
    })  
    useEffect(() => {
        const dataEffect = async () => {
            const info = await warningPicture()
            const plug = await Plug()
            setPlug(plug.timeline)
            setInfo(info)
            await timeLine(info,plug)
            setRefreshing(false)
        }
        dataEffect()
    }, [refreshing]);
    useEffect(() => {
        const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
        return () => backHandlerSubscription.remove();
    },[])
    // useEffect(()=>{
    //     const dataEffect = async () => {
    //         try{
    //             const user = await  findUser();
    //             if(user.galaxHash){
    //                 return console.log('tem carteira criada;')
    //             }
    //             const response = await RegisterWallet();
    //             console.log(response)
    //         }catch(e){
    //             console.log('erro wallet')
    //         }
    //     }
    //     dataEffect()
    // },[])
    useFocusEffect(
        React.useCallback(() => {
        const fetchData = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync(); 
            if (status !== 'granted') { 
                await setModalMid(<LocationDenied/>)
                fetchData();
                return;
            }
        };
        fetchData();
        }, [navigation])
    );
    return(
       <>
            <Bar navigation={navigation} />
            {modalMid}
            <ScrollView style={twrnc`h-full bg-white`}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                    { (info.picture === 'analyze' || info.picture === 'reprove' || info.picture === 'success') && plug != 4  ?
                            timeLineView
                        : 
                       <View style={twrnc`gap-5 mb-20`}>
                            <Access navigation={navigation}/>
                            <Balance/>
                            <Banner/>
                       </View>
                    }
            </ScrollView>
        </>
      
    )
}