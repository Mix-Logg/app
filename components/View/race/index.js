import { ScrollView, View, Text } from "react-native";
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import CardAllRace from "../../cardAllRace";
export default function Race({navigation}){
    return(
        <>
            <FixBar navigation={navigation} opition={'race'} />
            <ScrollView style={twrnc`bg-white`}>
                {/* <View style={twrnc`h-full p-5 gap-8`}>
                    <View style={twrnc`border-b border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-2 items-center`}>
                            <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            <View>
                                <Text style={twrnc`font-bold text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-2 items-center`}>
                            <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            <View>
                                <Text style={twrnc`font-bold text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-2`}>
                            <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />

                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                </View> */}
                <CardAllRace navigation={navigation} />
                
            </ScrollView>
        </>
    )
}