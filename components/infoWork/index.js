import { View, Text, ScrollView, TouchableOpacity, Linking}  from "react-native"
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Feather, AntDesign   } from '@expo/vector-icons';
import Button from "../../util/button";
import twrnc from "twrnc"
import Modal from '../modalBottom'
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import Mask from "../../hooks/mask";
import CancelRace from "../cancelRace";
export default function InfoWork({navigation}){
    const route = useRoute();
    const [name , setName] = useState('')
    const [phone , setPhone] = useState('')
    const [price , setPrice] = useState('')
    const [modalCancel , setModalCancel] = useState('')

    useEffect (() => {
        setPrice(route.params.price)
        setPhone(route.params.phone)
        setName(route.params.name)
    },[])

    const handlePhone = (phone) => {
        const url = `tel:${phone}`;
        Linking.openURL(url);
    
    }

    const handleCancelRace = async () => {
        await setModalCancel('')
        await setModalCancel(< CancelRace setModalCancel={setModalCancel} />)
        // navigation.navigate('Home')
    }

    const handleHelp = () => {
        const url = `https://wa.me/5511978612671`
        Linking.openURL(url);
    }

    return(
            <Modal>
                {modalCancel}
                <ScrollView>
                    <View style={twrnc`h-full mt-5 gap-8`}>
                        <View>
                            <Text style={twrnc`text-2xl font-bold`}>Detalhes do frete</Text>
                        </View>
                        <View>
                            
                        </View>
                        <View style={twrnc`gap-8`}>
                            <View style={twrnc`flex-row gap-3 items-center`}>
                                <AntDesign name="user" size={24} color="black" style={twrnc`text-neutral-500`} />
                                <Text style={twrnc`text-neutral-500 font-medium`}>{name}</Text>
                            </View>
                            <TouchableOpacity style={twrnc`flex-row items-end items-center justify-between`}
                                onPress={()=>handlePhone(phone)}
                            >
                                <View style={twrnc`flex-row gap-3 items-center`}>
                                    <AntDesign name="phone" size={24} style={twrnc`text-neutral-500`} />
                                    <Text style={twrnc`font-medium text-neutral-500`}>
                                    { Mask('phone',phone) } 
                                    </Text>
                                </View>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={twrnc`flex-row items-end items-center justify-between`}
                                onPress={()=>handleHelp()}
                            >
                                <View style={twrnc`flex-row gap-3 items-center`}>
                                    <AntDesign name="customerservice" size={24} color="#FF5F00" />
                                    <Text style={twrnc`font-medium text-[#FF5F00]`}>Ajuda</Text>
                                </View>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={twrnc`flex-row gap-3 items-center`}>
                                <Text style={twrnc`text-base font-bold text-green-600`}>+ R$ {price} reais</Text>
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
                        <View style={twrnc`gap-3 mb-20`}>
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