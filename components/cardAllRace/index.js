import { TouchableOpacity, Text, Image, View } from "react-native";
import twrnc from "twrnc";
import { useEffect, useState } from "react";
import { AntDesign, Octicons , MaterialIcons } from "@expo/vector-icons";
import AllStorage from "../../hooks/findAllStorage";
import Motorcycle from "../../img/vehicle/motorcycle.png";
import Mask from "../../hooks/mask";
import Tour from "../../img/vehicle/tour.png";
import Util from "../../img/vehicle/fiorino.png";
import Van from "../../img/vehicle/van.png";
import Vuc from "../../img/vehicle/cartload.png";
export default function CardAllRace({ navigation, id, isVisible, price, initial, finish, km, idClient }) {
  const [picture, setPicture] = useState(null)

  const handleRace = () => {
    const params = {
      id: id,
      price: price,
      initial: initial,
      finish: finish,
      km: km,
      idClient: idClient
    }
    navigation.navigate("InfoRace", params);
  };

  useEffect(()=>{
    const fetchData = async () => {
      const vehicle = await AllStorage()
      switch (vehicle.vehicle) {
        case 'vuc':
          setPicture(Vuc)
          break;
        case 'van':
          setPicture(Van)
          break;
        case 'util':
          setPicture(Util)
          break;
        case 'tour':
          setPicture(Tour)
          break;
        case 'motorcycle':
          setPicture(Motorcycle)
          break;
        default:
          setPicture(Vuc)
          break;
      }
    }
    fetchData()
  },[])

  return (
    <TouchableOpacity
      style={twrnc`border-b border-[#d4d4d4] rounded-xl p-3 gap-2 flex-row justify-between ${isVisible == 1 ? '' : 'hidden'}`}
      onPress={() => handleRace()}
    >
      <View style={twrnc`flex-row gap-3`}>
        <View style={twrnc`items-center justify-center px-2`}>
          <View
            style={twrnc`h-18 w-18 border border-[#a3a3a3] bg-[#d4d4d4] p-4 rounded-xl`}
          >
            {picture != null &&
              <Image
              style={twrnc`w-full h-full`}
              source={picture}
              resizeMode={"contain"}
            />
            }
          </View>
        </View>
        <View style={twrnc`justify-between `}>
          <View style={twrnc`flex-row gap-2 items-center`}>
            {/* <Ionicons
              name="location-outline"
              size={19}
              color="#FF5F00"
            />
            <View>
              <Text style={twrnc`text-[#191919] `}>A {km}km de você</Text>
            </View> */}
          </View>
          <View style={twrnc`flex-row gap-2 items-center`}>
            <Octicons name="location" size={18} color="#FF5F00" />
            <View>
              <Text style={twrnc` text-neutral-500 font-bold`}>O frete possui {km}km</Text>
            </View>
          </View>
          <View style={twrnc`flex-row gap-2`}>
            <View style={twrnc`justify-center`}>
              <Text
                style={twrnc`font-medium text-green-600 font-bold`}
              >
                {Mask('amount',price)} reais
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={twrnc`justify-center items-end `}>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#FF5F00" />
      </View>
    </TouchableOpacity>
  );
}
