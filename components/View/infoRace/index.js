import FixBar from "../../fixBar";
import twrnc from "twrnc";
import { ScrollView, View, Text, Linking, Pressable  } from "react-native";
import { FontAwesome5, Octicons, MaterialIcons, Feather  } from '@expo/vector-icons';


import Button from "../../../util/button";
export default function InfoRace({navigation}){

    const handleRace = () => {
        navigation.navigate('Work')
    }


    return(
        <>
            <FixBar navigation={navigation} opition={'infoRace'} />
            <ScrollView style={twrnc`bg-white h-full`}>
                <View style={twrnc`px-5 py-5`}>
                    <Text style={twrnc`text-2xl font-bold`}>Informações do frete</Text>
                </View>
                <View style={twrnc`mt-10 px-5`}>
                    <View style={twrnc` px-2 py-3 gap-9`}>
                        <View style={twrnc`flex-row items-center gap-5 px-2 border-b py-3 border-[#a3a3a3]`}>
                            <FontAwesome5 name="user" size={28} color="#a3a3a3" />
                            <Text style={twrnc`text-base font-bold`}>Guilherme Cardoso Santos</Text>
                        </View>
                        <View style={twrnc`flex-row items-center gap-5 px-2 border-b py-3 border-[#a3a3a3]`}>
                            <Octicons name="location" size={28} color="#a3a3a3" />
                            <View style={twrnc`flex-row items-end`}>
                                <Text style={twrnc`text-base font-bold`}>
                                    A 4 km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row items-center gap-4 px-2 border-b py-3 border-[#a3a3a3]`}>
                            <MaterialIcons name="gps-fixed" size={28} color="#a3a3a3"/>
                            <View style={twrnc`flex-row items-end`}>
                                <Text style={twrnc`text-base font-bold`}>A corrida tem 12 km</Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row items-center gap-5`}>
                            <View style={twrnc`bg-green-300 rounded-full w-12 h-12 items-center justify-center`}>
                                <MaterialIcons name="attach-money" size={30} style={twrnc`text-green-700`} />
                            </View>
                            <View style={twrnc`flex-row items-end gap-1`}>
                                <Text style={twrnc`text-xl font-bold text-green-600`}>200,00</Text>
                                <Text style={twrnc`text-xs font-bold text-green-600`}>reais</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={twrnc`mt-20 px-10`}>
                    <View style={twrnc``}> 
                        <Button background={'bg-[#FF5F00]'} handle={handleRace}> 
                           <Text style={twrnc`text-base text-white font-bold py-2`}>Inciar frete </Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}