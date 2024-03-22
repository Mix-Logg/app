import FixBar from "../../fixBar";
import twrnc from "twrnc";
import { ScrollView, View, Text, Linking, Pressable  } from "react-native";
import { MaterialIcons, Ionicons , AntDesign, SimpleLineIcons} from "@expo/vector-icons";


import Button from "../../../util/button";
export default function InfoRace({navigation}){

    const handleRace = () => {
        navigation.navigate('Work')
    }


    return(
        <>
            <FixBar navigation={navigation} opition={'infoRace'} />
            <ScrollView style={twrnc`bg-white h-full`}>
                <View style={twrnc`px-5 py-5 gap-2`}>
                    <Text style={twrnc`text-2xl font-bold`}>Informações do frete</Text>
                </View>
                <View style={twrnc`mt-10 px-5`}>
                    <View style={twrnc` px-2 py-3 gap-3`}>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <AntDesign name="user" size={20} color="#FF5F00" /> 
                            <Text style={twrnc``}>Guilherme Cardoso Santos</Text>
                        </View>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <SimpleLineIcons name="location-pin" size={20} color="#FF5F00" />
                            <Text style={twrnc``}>Está a 4 km de distância</Text>
                        </View>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <AntDesign name="flag" size={20} color="#FF5F00" />
                            <Text style={twrnc``}>O frete possui 17 km</Text>
                        </View>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <Text style={twrnc`text-green-600 font-bold text-base`}>R$ 357,00 reais</Text>
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