import { ScrollView, View, Text, Image, TouchableOpacity  } from "react-native";
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import Pix from '../../../img/icons/pix.png'
import Money from '../../../img/icons/money.png'
import { MaterialIcons } from '@expo/vector-icons';
import ModalBottom from "../../modalBottom";
import { useEffect, useState } from "react";
import CadasterPix from "../../cadasterPix";
import Rescue from "../../rescue";

export default function Wallet({navigation}){
    const [modal,setModal] = useState('')
    

    const handleAccess = async (option) => {
        await setModal('')
        if(option == 'pix'){
            await setModal(
                <ModalBottom>
                    <CadasterPix/>
                </ModalBottom>
            )
            return;
        }
        if(option == 'rescue'){
            await setModal(
                <ModalBottom>
                    <Rescue/>
                </ModalBottom>
            )
        }
    }
    

    return(
        <>
            {modal}
            <FixBar navigation={navigation} opition={'wallet'} />
            <ScrollView style={twrnc`bg-white`}>
                <View style={twrnc`p-5 gap-10`}>
                    <View>
                            <Text style={twrnc`text-base text-[#737373]`}>Saldo disponível</Text>
                            <Text style={twrnc`font-bold text-4xl`}>R$ 50,00</Text>
                    </View>
                    <View style={twrnc`gap-8`}>
                        <TouchableOpacity style={twrnc`flex-row items-center justify-between w-full`}
                            onPress={()=>handleAccess('rescue')}
                        > 
                                <View style={twrnc`flex-row items-center gap-5`}>
                                    <View style={twrnc`w-7 h-7`}>
                                        <Image style={twrnc`h-full w-full`} resizeMode="contain" source={Money} />
                                    </View> 
                                    <Text style={twrnc`text-base text-[#737373]`}>Resgatar</Text>
                                </View>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={twrnc`flex-row items-center w-full justify-between gap-3`}
                            onPress={() => handleAccess('pix')}
                        > 
                                <View style={twrnc`flex-row items-center gap-5`}>
                                    <View style={twrnc`w-7 h-7`}>
                                        <Image style={twrnc`h-full w-full`} resizeMode="contain" source={Pix} />
                                    </View> 
                                    <Text style={twrnc`text-base text-[#737373]`}>Cadastro PIX</Text>
                                </View>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                                
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}