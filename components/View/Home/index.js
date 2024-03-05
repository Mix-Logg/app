import { useState, useEffect } from 'react';
import { View, Image,Text ,TextInput, Pressable, RefreshControl, ScrollView, Button, SafeAreaView, StatusBar   } from 'react-native';
import Bar from '../../bar';
import warningPicture from '../../warningPicture';
import twrnc from 'twrnc';
import DocumentTimeline from '../../timeline';
import Plug from '../../../api/plug';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home ({navigation}){
    const [refreshing, setRefreshing] = useState(false); 
    const [info, setInfo] = useState(false); 
    const [timeLineView, setTimeLineView] = useState('');
    const [plug, setPlug] = useState('');
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
    useEffect(() => {
        dataEffect = async () => {
            const info = await warningPicture()
            const plug = await Plug()
            setPlug(plug.timeline)
            setInfo(info)
            await timeLine(info,plug)
            setRefreshing(false)
        }
        dataEffect()
    }, [refreshing]);
    
    return(
        
       <SafeAreaView style={twrnc`bg-white mt-6`}>
            <Bar navigation={navigation} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={twrnc`flex h-200`}>
                    { (info.picture === 'analyze' || info.picture === 'reprove' || info.picture === 'success') && plug != 4  ?
                            timeLineView
                        : 
                            <View>
                                <Text>agregado!</Text>
                            </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
      
    )
}