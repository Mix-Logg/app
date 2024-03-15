import { View, Text, Image } from "react-native"
import Money from '../../img/icons/money.png'
import MaskInput, { Masks } from 'react-native-mask-input';
import twrnc from "twrnc"
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function Rescue(){
    const [moneyRescue,setMoneyRescue] = useState()
    return(
        <KeyboardAwareScrollView>
            <View>
                <View style={twrnc`w-full justify-center items-center`}>
                    <View style={twrnc`w-7 h-7`}>
                        <Image
                            style={twrnc`h-full w-full`}
                            resizeMode="contain"
                            source={Money}
                        />
                    </View>
                </View>
                <View style={twrnc`mt-10 gap-2`}>
                    <Text style={twrnc`font-bold text-3xl`}>Qual é o valor da transferência?</Text>
                    <View style={twrnc` flex-row gap-2`}>
                        <Text style={twrnc`text-base text-[#6b7280]`}>Saldo disponível em conta</Text>
                        <Text style={twrnc`font-bold text-base text-[#4b5563]`}>R$ 50,00</Text>
                    </View>
                </View>
                <View style={twrnc`border-b border-[#E7E7E7] flex-row mt-10 gap-2 items-center`}>
                    <MaskInput
                        style={twrnc`text-3xl font-bold w-full`}
                        mask = {Masks.BRL_CURRENCY}
                        value={moneyRescue}
                        onChangeText={(masked, unmasked)=>setMoneyRescue(unmasked)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={twrnc`flex-row gap-2 mt-1`}>
                    <Text style={twrnc`font-bold text-xs`}>PIX Destinatário:</Text>
                    <Text style={twrnc`font-bold text-xs bg-orange-50 px-1 rounded-lg text-[#FF5F00]`}>Guifoxlokaum@gmail.com</Text>
                </View>
                <View style={twrnc`w-full items-end mt-8 mb-2`}>
                    <View style={twrnc`p-3 bg-[#FF5F00] rounded-full`}>
                        <Feather name="arrow-right" size={24} color="white" />
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}