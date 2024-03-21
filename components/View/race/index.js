import { ScrollView, View, Text } from "react-native";
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import { MaterialIcons   } from '@expo/vector-icons';
export default function Race({navigation}){
    return(
        <>
            <FixBar navigation={navigation} opition={'race'} />
            <ScrollView style={twrnc`bg-white`}>
                <View style={twrnc`h-full p-5 gap-8`}>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={twrnc`border border-[#d4d4d4] rounded-xl p-3 gap-2 `}>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-orange-200`}>
                                <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A 4km de você
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3 items-center`}>
                            <View style={twrnc`rounded-lg p-2 bg-neutral-200`}>
                                <MaterialIcons name="my-location" size={24} style={twrnc`text-neutral-600`} />
                            </View>
                            <View>
                                <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                                    A corrida tem 54km
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row gap-3`}>
                            <View style={twrnc`bg-green-300 rounded-lg p-2`}>
                                <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                            </View>
                            <View style={twrnc`justify-center`}>
                                <Text style={twrnc`font-bold text-lg text-green-600 `}>
                                    199,00 reais
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}