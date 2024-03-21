import { View, Text, ScrollView, Pressable, Linking}  from "react-native"
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Feather, Entypo  } from '@expo/vector-icons';
import Button from "../../util/button";
import twrnc from "twrnc"
import Modal from '../modalBottom'

export default function InfoWork({navigation}){
    
    const handlePhone = (phone) => {
        const url = `tel:${phone}`;
        Linking.openURL(url);
    
    }

    const handleCancelRace = () => {
        navigation.navigate('Home')
    }

    const handleHelp = () => {
        console.log('help')
    }

    return(
            <Modal>
                <ScrollView>
                    <View style={twrnc`h-full mt-5 gap-10`}>
                        <View>
                            <Text style={twrnc`text-2xl font-bold`}>Detalhes do frete</Text>
                        </View>
                        <View style={twrnc`gap-8`}>
                            <View style={twrnc`flex-row gap-3 items-end`}>
                                <FontAwesome5 name="user" size={27} color="#71717a" />
                                <Text style={twrnc`text-base font-bold text-[#71717a]`}>Guilherme Cardoso Santos</Text>
                            </View>
                            <Pressable style={twrnc`flex-row items-end items-center justify-between`}
                                onPress={()=>handlePhone('11932291233')}
                            >
                                <View style={twrnc`flex-row gap-3`}>
                                    <Feather name="phone" size={27} color="#71717a" />
                                    <Text style={twrnc`text-base font-bold text-[#71717a]`}>(11) 9 3229-1233</Text>
                                </View>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </Pressable>
                            <Pressable style={twrnc`flex-row items-end items-center justify-between`}
                                onPress={()=>handleHelp()}
                            >
                                <View style={twrnc`flex-row gap-3`}>
                                    <Feather name="headphones" size={27} color="#FF5F00" />
                                    <Text style={twrnc`text-base font-bold text-[#FF5F00]`}>Ajuda</Text>
                                </View>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </Pressable>
                            <View style={twrnc`flex-row gap-3 items-center`}>
                                <View style={twrnc`p-1 bg-green-200 rounded-full`}>
                                    <MaterialIcons name="attach-money" size={27} style={twrnc`text-green-600`} />
                                </View>
                                <Text style={twrnc`text-lg font-bold text-green-600`}>+ 3.000,00</Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row items-center gap-2`}>
                            <MaterialCommunityIcons name="information-outline" size={24} color="#eab308" />
                            <View>
                                <Text style={twrnc`text-xs px-5`}>
                                    Caso você cancelar o frete será cobrado um valor 
                                    significativo de <Text style={twrnc`font-bold text-[#eab308]`}>R$5 reais</Text>, evite cancelar seus fretes, contamos com você!
                                </Text>
                            </View>
                        </View>
                        <View style={twrnc`gap-3`}>
                            {/* <Button handle={handleCancelRace} background={'bg-[#FF5F00]'} >
                                <View style={twrnc`py-2`}>
                                    <Text style={twrnc`text-lg font-bold text-white`}>Continuar frete</Text>
                                </View>
                            </Button> */}
                            <Button handle={handleCancelRace} background={'bg-[#d4d4d4]'} >
                                <View style={twrnc`py-2`}>
                                    <Text style={twrnc`text-lg font-bold text-white`}>Cancelar frete</Text>
                                </View>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
    )
}