import { TouchableOpacity, Text, View, Image } from "react-native";
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import InfoHistory from "../infoHistory";
import AllStorage from "../../hooks/findAllStorage";
import twrnc from "twrnc";
import Mask from "../../hooks/mask";
import Motorcycle from "../../img/vehicle/motorcycle.png";
import Tour from "../../img/vehicle/tour.png";
import Util from "../../img/vehicle/fiorino.png";
import Van from "../../img/vehicle/van.png";
import Vuc from "../../img/vehicle/cartload.png";
import { useEffect, useState } from "react";
export default function CardHistory({price, raceId, km, cancel, cancelDate, tax}){
    const [infoHistory, setInfoHistory] = useState('')
    const [picture, setPicture] = useState(null)
    
    const handleHistory = async () => {
        if(cancel){
          return
        }
        await setInfoHistory('')
        await setInfoHistory(<InfoHistory raceId={raceId}/>)
    }

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

    return(
      <>
        {infoHistory}
        <TouchableOpacity
        style={twrnc`border-b border-[#d4d4d4] rounded-xl p-3 gap-2 flex-row justify-between`}
        onPress={() =>handleHistory()}
      >
        <View style={twrnc`flex-row gap-3`}>
          <View style={twrnc`items-center justify-center px-2`}>
            <View className='h-16 w-16 border border-neutral-300 bg-neutral-200 rounded-xl'
            >
             { picture &&
              <Image
                  style={twrnc`w-full h-full`}
                  source={picture}
                />
              }
            </View>
          </View>
          <View style={twrnc`gap-3 justify-center`}>
            <View style={twrnc`flex-row gap-2 items-center`}>
              { cancel ?
                <View>
                  <Text className='font-light text-red-600'>
                    Você cancelou
                  </Text>
                  <Text className='font-light'>
                    {Mask('dateFormat', cancelDate)}
                  </Text>
                </View>
                :
                <>
                  <MaterialCommunityIcons name="history" size={20} color="#FF5F00" />
                  <View>
                    <Text className='font-light' style={twrnc` text-[#191919]`}>Você rodou {Mask('km',km)} km</Text>
                  </View>
                </>
              }
            </View>
            <View style={twrnc`flex-row gap-2`}>
              { cancel ?
                <View>
                  <Text className='text-red-600 font-bold'>
                    -{Mask('amount',tax)}
                  </Text>
                </View>
                :
                <View style={twrnc`justify-center`}>
                  <Text
                    style={twrnc`text-green-600 font-bold`}
                  >
                    {Mask('amount', price)} reais
                  </Text>
                </View>
              }
            </View>
          </View>
        </View>
        { !cancel &&
          <View style={twrnc`justify-center items-end `}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#FF5F00" />
          </View>
        }
        </TouchableOpacity>
      </>
    )
}