import { ScrollView, View, Text, BackHandler } from "react-native";
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import Map from "../map";
import InfoWork from "../../infoWork";
import Button from "../../../util/button";
import { useState, useEffect } from "react";
import { MaterialIcons } from '@expo/vector-icons';
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
                    <View style={[twrnc`absolute w-30 h-20`, {top:'90%', left:'35%'}]}>
                        <Button handle={handleInfoWork}>
                            <View style={twrnc`bg-[#525252] opacity-55 p-2 rounded-full`}>
                                <Text style={twrnc`font-bold`}>
                                    <MaterialIcons name="keyboard-arrow-up" size={25} color="white" />
                                </Text>
                            </View>
                        </Button>
                    </View>
            </View>
            {info}
        </View>
    )
}