import { View, Text, Pressable, Image, Modal, TextInput, Keyboard, ScrollView } from "react-native";
import twrnc from 'twrnc';
import { useState } from "react";
import FixBar from "../../../fixBar"
import { Feather } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
export default function RegisterCarProfile({navigation}){
    const [plate, setPlate] = useState('');
    
    const handlePlate = (text) =>{
        setPlate(text)
    }
    
    return(
        <ScrollView>
            <View style={twrnc`h-200`}>
                <FixBar navigation={navigation} opition={'register'} />
                <View style={twrnc`p-5 gap-10`}>
                    <Pressable style={twrnc`bg-white h-25 rounded-lg p-3 flex-row`}>
                        <View style={twrnc`w-2/6`}>
                            <Text>img</Text>
                        </View>
                        <View style={twrnc`w-4/6 gap-1`}>
                            <Text style={twrnc`font-bold`}>
                                Utilitário
                            </Text>
                            <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                Perfeitos para eletrodomesticos e material de construção
                            </Text>
                            <Text style={twrnc`justify-center items-center text-xs`}>
                                <Feather name="box" size={15} color="black" /> até 500kg
                            </Text>
                        </View>
                    </Pressable >
                    <Pressable style={twrnc`bg-white h-25 rounded-lg p-3 flex-row`}>
                        <View style={twrnc`w-2/6`}>
                            <Text>img</Text>
                        </View>
                        <View style={twrnc`w-4/6 gap-1`}>
                            <Text style={twrnc`font-bold`}>
                                Van
                            </Text>
                            <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                Perfeitos para transportar móveis médios, como geladeira e mesa
                            </Text>
                            <Text style={twrnc`justify-center items-center text-xs `}>
                                <Feather name="box" size={15} color="black" /> até 1000kg
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable style={twrnc`bg-white h-25 rounded-lg p-3 flex-row`}>
                        <View style={twrnc`w-2/6`}>
                            <Text>img</Text>
                        </View>
                        <View style={twrnc`w-4/6 gap-1`}>
                            <Text style={twrnc`font-bold`}>
                                Carreto
                            </Text>
                            <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                Perfeitos para mudanças ou materiais grandes e pesados
                            </Text>
                            <Text style={twrnc`justify-center items-center text-xs`}>
                                <Feather name="box" size={15} color="black" /> até 1500kg
                            </Text>
                        </View>
                    </Pressable>
                </View>
                <View style={twrnc`mt-2 mb-3 p-5 `}>
                    <Text style={twrnc`m-7 absolute text-xs font-bold z-2`}>
                        Placa do Veículo
                    </Text>
                        <MaskInput
                            style={twrnc`pt-8 h-20 pl-5 rounded-xl bg-white text-xl`}
                            value={plate}
                            maxLength={8}
                            autoCapitalize="none"
                            placeholder="Digite"
                            onChangeText={handlePlate}
                        ></MaskInput>
                </View>
            </View>
        </ScrollView>
    )
}