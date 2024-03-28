import { View, Text, TouchableOpacity, Image  } from "react-native"
import { Ionicons, MaterialIcons   } from '@expo/vector-icons';
import { useState } from "react";
import twrnc from "twrnc"
import Coin from '../../img/icons/coin.png'

export default function Balance(){
    const [eye , setEye]=useState(false)

    const handleEye = () => {
        setEye(!eye)
    }

    return(
        <View style={twrnc`w-full h-45 `}>
            <View style={twrnc`flex-row items-center justify-between px-5`}>
                <View>
                    <Text style={twrnc`font-bold text-[#374151]`}>Meu saldo</Text>
                </View>
                <View>
                    { eye ?
                        <TouchableOpacity style={twrnc`flex-row gap-2 items-center`}
                            onPress={handleEye}
                        >
                            <Text style={twrnc`text-[#374151]`}>Esconder Saldo</Text>
                            <View
                                onPress={handleEye}
                            >
                                <Ionicons name="eye-off" size={20} style={twrnc`text-[#374151]`} /> 
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={twrnc`flex-row gap-2 items-center `}
                            onPress={handleEye}
                        >
                            <Text style={twrnc`text-[#374151]`}>Mostrar Saldo</Text>
                            <View>
                                <Ionicons name="eye" size={20} style={twrnc`text-[#374151]`} /> 
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={twrnc`items-center py-5`}>
                <View style={twrnc`w-7/8 border border-[#d4d4d4] rounded-xl h-7/8 px-5  gap-3 py-3`}>
                    <View style={twrnc`bg-orange-100 rounded-lg w-10 h-10 justify-center items-center`}>
                        <View style={twrnc`h-6 w-6`}>
                            <Image 
                                style={twrnc`h-full w-full`}
                                source={Coin}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={twrnc`flex-row items-center`}>
                        <MaterialIcons name="attach-money" size={24} style={twrnc`text-[#374151]`} />
                        { eye ?
                            <Text style={twrnc`text-base font-bold`}> 50,00</Text> :
                            <View style={twrnc`bg-orange-100 w-20 h-6 rounded-lg`}>

                            </View>
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}