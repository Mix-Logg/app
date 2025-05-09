import { View, Text, TouchableOpacity, Image } from "react-native"
import { Ionicons, MaterialIcons   } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import twrnc from "twrnc"
import Coin from '../../img/icons/coin.png'
import Mask from "../../hooks/mask";
import FindUser from "../../hooks/findUser";
export default function Balance(){
    const [eye , setEye]=useState(false)
    const [available , setAvailable]=useState(false)
    const [pending , setPending]=useState(false)

    const handleEye = () => {
        setEye(!eye)
    }

    useEffect(()=>{
        const fetchData = async () => {
            const user  = await FindUser();
            setAvailable(Mask('amount',user.amount))
            setPending(Mask('amount',user.amount))
        }
        fetchData()
    },[])

    return(
        <View className="w-full">
            <View style={twrnc`flex-row items-center justify-between px-5 `}>
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
            <View style={twrnc`items-center w-full p-5 `}>
                <View className="flex-row items-center border border-[#d4d4d4] w-full rounded-lg  px-5 gap-3 py-3 ">
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
                        { eye ?
                            <View className="">
                                <View className="flex-row items-center">
                                    <Text className="text-2xl font-extrabold text-neutral-700">{pending} reais</Text>
                                    
                                </View>
                                
                            </View> :
                            <View style={twrnc`bg-orange-100 w-20 h-6 rounded-lg`}>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}