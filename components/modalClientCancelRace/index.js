import { useState } from "react"
import { Text, View, TouchableOpacity} from "react-native"
import ModalMid from "../modalMid"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
export default function ModalClientCancelRace(){
    const navigation = useNavigation()

    const handleBack = async () => {
        await AsyncStorage.removeItem('raceId');
        navigation.navigate('Home')
    }

    return(
        <ModalMid>
            <View className='p-5 items-center'>
                <Text className='text-lg'>O cliente cancelou essa corrida</Text>
                <TouchableOpacity className='p-1 mt-5 bg-primary w-3/4 items-center rounded-lg'
                    onPress={handleBack}
                >
                    <Text className='text-white font-bold text-lg'>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ModalMid>
    )
}