import { Pressable, Text, View, Image } from "react-native";
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import InfoHistory from "../infoHistory";
import twrnc from "twrnc";
import Motorcycle from "../../img/vehicle/motorcycle.png";
import Tour from "../../img/vehicle/tour.png";
import Util from "../../img/vehicle/fiorino.png";
import Van from "../../img/vehicle/van.png";
import Vuc from "../../img/vehicle/cartload.png";
import { useState } from "react";
export default function CardHistory({navigation}){
    const [infoHistory, setInfoHistory] = useState('')
    
    const handleHistory = async () => {
        await setInfoHistory('')
        await setInfoHistory(<InfoHistory/>)
    }

    return(
        <Pressable
        style={twrnc`border-b border-[#d4d4d4] rounded-xl p-3 gap-2 flex-row justify-between`}
        onPress={() =>handleHistory()}
      >
        {infoHistory}
        <View style={twrnc`flex-row gap-3`}>
          <View style={twrnc`items-center justify-center px-2`}>
            <View
              style={twrnc`h-18 w-18 border border-[#a3a3a3] bg-[#d4d4d4] p-4 rounded-xl`}
            >
              <Image
                style={twrnc`w-full h-full`}
                source={Vuc}
                resizeMode={"contain"}
              />
            </View>
          </View>
          <View style={twrnc`gap-3 justify-center`}>
            <View style={twrnc`flex-row gap-2 items-center`}>
              <MaterialCommunityIcons name="history" size={20} color="#FF5F00" />
              <View>
                <Text style={twrnc` text-[#191919] `}>Você rodou 17 km</Text>
              </View>
            </View>
            <View style={twrnc`flex-row gap-2`}>
              <View style={twrnc`justify-center`}>
                <Text
                  style={twrnc`font-medium text-green-600 font-bold`}
                >
                  R$ 199,00 reais
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={twrnc`justify-center items-end `}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#FF5F00" />
        </View>
        </Pressable>
    )
}