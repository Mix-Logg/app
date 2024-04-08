import { ScrollView, View, Text, BackHandler } from "react-native";
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import Map from "../map";
import InfoWork from "../../infoWork";
import Button from "../../../util/button";
import { useState, useEffect } from "react";
import { MaterialIcons, Ionicons  } from '@expo/vector-icons';
export default function Work({navigation}){
    const [info, setInfo] = useState(<InfoWork navigation={navigation}/>)
    
    const handleInfoWork = async () => {
        await setInfo('')
        setInfo(<InfoWork navigation={navigation} />)
    }

    useEffect( () => {
        const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
      
        return () => backHandlerSubscription.remove();
    },[])


    return(
        <View style={twrnc`h-full bg-white`}>
            <View style={twrnc`bg-white h-full`} >
                <Map/>
                <View style={[twrnc`absolute `, {top:'90%', left:'83%'}]}>
                        <Button handle={handleInfoWork}>
                            <View style={twrnc` border p-1 rounded-xl border-[#a3a3a3] h-12 w-12 items-center justify-center`}>
                                <Text style={twrnc`font-bold`}>
                                    <Ionicons name="eye" size={28} color='#FF5F00' />
                                </Text>
                            </View>
                        </Button>
                </View>
            </View>
            {info}
        </View>
    )
}