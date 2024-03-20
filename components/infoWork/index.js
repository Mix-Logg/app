import { View, Text, ScrollView}  from "react-native"
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Feather  } from '@expo/vector-icons';
import Button from "../../util/button";
import twrnc from "twrnc"
import Modal from '../modalBottom'

export default function InfoWork({navigation}){
    
    // const handleModal = () => {
        
    // }

    const handleCancelRace = () => {
        navigation.navigate('Home')
    }

    
    return(
            <Modal>
                <ScrollView>
                    <View style={twrnc`h-full mt-5 gap-10`}>
                        <View>
                            <Text style={twrnc`text-2xl font-bold`}>Detalhes do frete</Text>
                        </View>
                        <View style={twrnc`gap-5`}>
                            <View style={twrnc`flex-row gap-3 items-end`}>
                                <FontAwesome5 name="user" size={27} color="#71717a" />
                                <Text style={twrnc`text-base font-bold text-[#71717a]`}>Guilherme Cardoso Santos</Text>
                            </View>
                            <View style={twrnc`flex-row gap-3 items-end`}>
                                <Feather name="phone" size={27} color="#71717a" />
                                <Text style={twrnc`text-base font-bold text-[#71717a]`}>(11) 9 3229-1233</Text>
                            </View>
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