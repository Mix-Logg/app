import twrnc from "twrnc";
import { View, Text, ScrollView, Pressable } from "react-native";
import { MaterialIcons   } from '@expo/vector-icons';
export default function Races({navigation}) {
    const handleAcessRace = () => {
        navigation.navigate('InfoRace')
    }
  
    return (
    <View style={twrnc`w-full h-60 px-5 py-5 bg-white-600`}>
      <View style={twrnc`flex-row w-full justify-between items-center`}>
        <Text style={twrnc`font-bold text-[#374151]`}>Fretes </Text>
        <Text style={twrnc` text-[#374151]`}>Acesso rápido </Text>
      </View>
      <View style={twrnc`justify-center items-center`}>
        <ScrollView horizontal style={twrnc`w-full py-2 px-1 gap-5 rounded-xl `}>
          <View style={twrnc`gap-3 py-4 flex-row`}>
            <Pressable style={twrnc`border border-b border-[#d4d4d4] rounded-lg gap-2 items-center py-5 px-3`}
                onPress={()=>handleAcessRace()}
            >
                <View style={twrnc`flex-row items-center gap-2 w-45`}>
                    <View style={twrnc`w-10 h-10 bg-orange-200 inline-flex rounded-lg items-center justify-center`}>
                        <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                    </View>
                    <View style={twrnc`flex-row gap-1 items-end`}>
                        <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                            Distância 4
                        </Text>
                        <Text>km</Text>
                    </View>
                </View>
                <View style={twrnc`flex-row items-center gap-2 w-45`}>
                    <View style={twrnc`w-10 h-10 bg-green-300 inline-flex rounded-lg text-green-600 items-center justify-center`}>
                        <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                    </View>
                    <View style={twrnc`flex-row gap-1 items-end`}>
                        <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                        199,00
                        </Text>
                        <Text>reais</Text>
                    </View>
                </View>
            </Pressable>
            <Pressable style={twrnc`border border-b border-[#d4d4d4] rounded-lg gap-2 items-center py-5 px-3`}>
                <View style={twrnc`flex-row items-center gap-2 w-45`}>
                    <View style={twrnc`w-10 h-10 bg-orange-200 inline-flex rounded-lg items-center justify-center`}>
                        <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                    </View>
                    <View style={twrnc`flex-row gap-1 items-end`}>
                        <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                            Distância 4
                        </Text>
                        <Text>km</Text>
                    </View>
                </View>
                <View style={twrnc`flex-row items-center gap-2 w-45`}>
                    <View style={twrnc`w-10 h-10 bg-green-300 inline-flex rounded-lg text-green-600 items-center justify-center`}>
                        <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                    </View>
                    <View style={twrnc`flex-row gap-1 items-end`}>
                        <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                        199,00
                        </Text>
                        <Text>reais</Text>
                    </View>
                </View>
            </Pressable>
            <Pressable style={twrnc`border border-b border-[#d4d4d4] rounded-lg gap-2 items-center py-5 px-3`}>
                <View style={twrnc`flex-row items-center gap-2 w-45`}>
                    <View style={twrnc`w-10 h-10 bg-orange-200 inline-flex rounded-lg items-center justify-center`}>
                        <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                    </View>
                    <View style={twrnc`flex-row gap-1 items-end`}>
                        <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                            Distância 4
                        </Text>
                        <Text>km</Text>
                    </View>
                </View>
                <View style={twrnc`flex-row items-center gap-2 w-45`}>
                    <View style={twrnc`w-10 h-10 bg-green-300 inline-flex rounded-lg text-green-600 items-center justify-center`}>
                        <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                    </View>
                    <View style={twrnc`flex-row gap-1 items-end`}>
                        <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                        199,00
                        </Text>
                        <Text>reais</Text>
                    </View>
                </View>
            </Pressable>
            <Pressable style={twrnc`border border-b border-[#d4d4d4] rounded-lg gap-2 items-center py-5 px-3`}>
                <View style={twrnc`flex-row items-center gap-2 w-45`}>
                    <View style={twrnc`w-10 h-10 bg-orange-200 inline-flex rounded-lg items-center justify-center`}>
                        <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                    </View>
                    <View style={twrnc`flex-row gap-1 items-end`}>
                        <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                            Distância 4
                        </Text>
                        <Text>km</Text>
                    </View>
                </View>
                <View style={twrnc`flex-row items-center gap-2 w-45`}>
                    <View style={twrnc`w-10 h-10 bg-green-300 inline-flex rounded-lg text-green-600 items-center justify-center`}>
                        <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                    </View>
                    <View style={twrnc`flex-row gap-1 items-end`}>
                        <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                        199,00
                        </Text>
                        <Text>reais</Text>
                    </View>
                </View>
            </Pressable>
            <Pressable style={twrnc`border border-b border-[#d4d4d4] rounded-lg gap-2 items-center py-5 px-3`}>
                <View style={twrnc`flex-row items-center gap-2 w-45`}>
                    <View style={twrnc`w-10 h-10 bg-orange-200 inline-flex rounded-lg items-center justify-center`}>
                        <MaterialIcons name="location-on" size={24} style={twrnc`text-orange-500`} />
                    </View>
                    <View style={twrnc`flex-row gap-1 items-end`}>
                        <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                            Distância 4
                        </Text>
                        <Text>km</Text>
                    </View>
                </View>
                <View style={twrnc`flex-row items-center gap-2 w-45`}>
                    <View style={twrnc`w-10 h-10 bg-green-300 inline-flex rounded-lg text-green-600 items-center justify-center`}>
                        <MaterialIcons name="attach-money" size={24} style={twrnc`text-green-600`} />
                    </View>
                    <View style={twrnc`flex-row gap-1 items-end`}>
                        <Text style={twrnc`font-bold text-lg text-[#191919] `}>
                        199,00
                        </Text>
                        <Text>reais</Text>
                    </View>
                </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
