
import { View, Text, Image, TouchableOpacity } from "react-native"
import twrnc from "twrnc"
import ModalMid from "../modalMid";
import Woman from '../../img/uniqueIcons/woman.png'
import Button from "../../util/button";
import { useNavigation } from "@react-navigation/native";
export default function SuccessCadasterPix(){
    const navigation = useNavigation();
    
    const handleContinue = () => {
        navigation.navigate('Home')
    }

    return(
        <ModalMid>
            <View style={twrnc`bg-[#FF5F00] p-1 rounded-lg`}>
                <View style={twrnc`bg-white rounded-lg`}>
                    <View style={twrnc`flex-row w-full p-5`}>
                        <View style={twrnc`w-1/2 gap-10`}>
                            <View>
                                <Text style={twrnc`text-2xl font-bold text-[#FF5F00]`}>Ei, deu certo!</Text>
                                <Text style={twrnc`text-neutral-500 font-medium`}>Atualizamos seu pix com sucesso</Text>
                            </View>
                            <View>
                                <Text style={twrnc`text-neutral-400 font-medium`}>
                                    Agora vou te enviar para o ínicio, fique tranquilo
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`w-1/2`}>
                            <View style={twrnc`h-40`} >
                                <Image
                                    style={twrnc`w-full h-full`}
                                    source={Woman}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <Button background="bg-[#FF5F00]" handle={handleContinue}>
                    <Text style={twrnc`text-white font-bold `}>
                        Continuar
                    </Text>
                </Button>
            </View>
        </ModalMid>
    )
}
