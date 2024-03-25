import { View, Text, Pressable, Linking } from "react-native"
import { AntDesign, MaterialIcons, Ionicons   } from '@expo/vector-icons';
import twrnc from "twrnc"
import ModalBottom from "../modalBottom"
export default function InfoHistory(){

    const handleHelp = () => {
        const url = `https://wa.me/5511978612671`
        Linking.openURL(url);
    }
    
    return(
        <ModalBottom>
            <View style={twrnc`py-5 gap-10`}>
                <View>
                    <Text style={twrnc`text-2xl font-bold`}>
                        Informações avançadas
                    </Text>
                </View>
                <View style={twrnc`gap-4`}>
                    <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2'`}>
                        <AntDesign name="user" size={24} color="#FF5F00" />
                        <Text style={twrnc`text-[#737373] font-medium`}>Guilherme Cardoso Santos</Text>
                    </View>
                    <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2'`}>
                        <MaterialIcons name="history-toggle-off" size={24} color="#FF5F00" />
                        <Text style={twrnc`text-[#737373] font-medium`}>17:38 segunda-feira</Text>
                    </View>
                    <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2'`}>
                        <Ionicons name="location-outline" size={24} color="#FF5F00" />
                        <Text style={twrnc`text-[#737373] font-medium`}>17 km</Text>
                    </View>
                    <View style={twrnc`border-b border-[#d4d4d4] flex-row items-end gap-3 py-2 px-1'`}>
                        <Text style={twrnc`text-green-600 font-bold text-base`}>+ R$ 700 reais</Text>
                    </View>
                </View>
                <Pressable style={twrnc`flex-row items-end items-center justify-between`}
                    onPress={()=>handleHelp()}
                >
                    <View style={twrnc`flex-row gap-3`}>
                        <AntDesign name="customerservice" size={24} color="#FF5F00" />
                        <Text style={twrnc`font-bold`}>Suporte</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>
            </View>
        </ModalBottom>
    )
}