import twrnc from "twrnc"
import { Pressable, View, Text,  } from "react-native"
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
export default function CardFastRace({navigation}){
    const handleAcessRace = () => {
        navigation.navigate('InfoRace')
    }

    return(
        <Pressable style={twrnc`border border-[#d4d4d4] rounded-lg gap-2 py-5 px-3`}
                onPress={()=>handleAcessRace()}
            >
                <View style={twrnc`flex-row gap-1`}>
                    <Ionicons
                        name="location-outline"
                        size={19}
                        color="#FF5F00"
                    />
                    <Text style={twrnc`text-[#737373]`}>
                        A 4km de você
                    </Text>
                </View>
                <View style={twrnc`flex-row`}>
                    <Text style={twrnc`text-green-600 font-medium`}>
                        R$ 199,00 reais
                    </Text>
                </View>
        </Pressable>
    )
}