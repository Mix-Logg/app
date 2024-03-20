import { useState, useEffect } from 'react';
import { View, Image,Text ,TextInput, Pressable, RefreshControl, ScrollView, Button, SafeAreaView, StatusBar, BackHandler} from 'react-native';
import Bar from '../../bar';
import warningPicture from '../../warningPicture';
import twrnc from 'twrnc';
import DocumentTimeline from '../../timeline';
import Plug from '../../../api/plug';
import Races from '../../races';
import Access from '../../access';
import Balance from '../../balance';

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
    useEffect( () => {
        const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
      
        return () => backHandlerSubscription.remove();
    },[])

    return(
        
       <>
            <Bar navigation={navigation} />
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
                            <Races navigation={navigation} />
                       </View>
                    }
            </ScrollView>
        </>
      
    )
}