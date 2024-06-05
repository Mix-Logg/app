import { View, Text, Pressable, Image, ScrollView, SafeAreaView } from "react-native"
import twrnc from 'twrnc';
import { useState, useRef } from "react";
import FixBar from "../../../fixBar"
import { Feather } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
import PopUp from "../../../modal";
import CartLoad from '../../../../img/vehicle/cartload.png'
import Van from '../../../../img/vehicle/van.png'
import Tour from '../../../../img/vehicle/tour.png'
import Fiorino from '../../../../img/vehicle/fiorino.png'
import Motorcycle from '../../../../img/vehicle/motorcycle.png'
import Auxiliary from '../../../../img/vehicle/auxiliary.png'
import CadasterPlate from "../../../cadasterPlate";
export default function RegisterCarProfile({navigation}){
    const [am, setAm] = useState(false);
    const [card, setCard] = useState(false);
    const [modalBottom, setModalBottom] = useState('');
    

    const handleCard = async (cardType) =>{
        let am
        let vehicle
        switch (cardType) {
            case 'util':
                vehicle = 'util'
                break;
            case 'van':
                vehicle = 'van'
                break;
            case 'vuc':
                vehicle = 'vuc'
                break;
            case 'tour':
                vehicle = 'tour'
                break;
            case 'motorcycle':
                vehicle = 'motorcycle'
                break;
            default:
                break
        }
        if(cardType === 'auxiliary'){
            const param = {
                user:{
                    am:'auxiliary'
                }
            }
            navigation.navigate('RegisterUser', param);
            return;
        }
        await setModalBottom('')
        if(cardType === 'motorcycle'){
            am = 'motorcycle';
        }
        if(cardType === 'tour'){
            am = 'tour';
        }
        if( cardType === 'util' || cardType === 'van' || cardType === 'vuc'){
            
            am = 'driver';
        }
        setModalBottom(<CadasterPlate am={am} vehicle={vehicle} navigation={navigation} setModalBottom={setModalBottom}/>)
        return;
    }
    
    return(
        <>
            <FixBar navigation={navigation} opition={'register'} />
            {modalBottom}
            <ScrollView style={twrnc`bg-white`}>
                    <View style={twrnc`p-5 gap-5`}>
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ card === 'auxiliary' ? 'border-[#FF5F00]' : ''}`}
                            onPress={()=>handleCard('auxiliary')}
                        >
                            <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center `}>
                                <Image
                                    style={twrnc`w-6/6 h-full`}
                                    resizeMode="contain"
                                    source={Auxiliary}
                                />
                            </View>
                            <View style={twrnc`w-4/6 gap-1`}>
                                <Text style={twrnc`font-bold ${ card === 'auxiliary' ? 'text-[#FF5F00]' : ''}`} >
                                    Entregador
                                </Text>
                                <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                    Ideal para quem gosta de ajudar a entregar sonhos
                                </Text>
                                <Text style={twrnc`justify-center items-center text-xs`}>
                                    Não possuo veículo
                                </Text>
                            </View>
                        </Pressable >
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ card === 'motorcycle' ? 'border-[#FF5F00]' : ''}`}
                            onPress={()=>handleCard('motorcycle')}
                        >
                            <View style={twrnc`w-2/6 p-3 pr-2 justify-center items-center rounded-lg`}>
                                <Image
                                    style={twrnc`w-full h-full`}
                                    source={Motorcycle}
                                />
                            </View>
                            <View style={twrnc`w-4/6 gap-1`}>
                                <Text style={twrnc`font-bold ${ card === 'motorcycle' ? 'text-[#FF5F00]' : ''}`} >
                                    Moto
                                </Text>
                                <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                    Ideal para entregar pacotes pequenos, comidas e documentos
                                </Text>
                                <Text style={twrnc`justify-center items-center text-xs`}>
                                    <Feather name="box" size={15} color="black" /> até 20kg
                                </Text>
                            </View>
                        </Pressable >
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ card === 'tour' ? 'border-[#FF5F00]' : ''}`}
                            onPress={()=>handleCard('tour')}
                        >
                            <View style={twrnc`w-2/6 p-3 pr-2 justify-center items-center rounded-lg`}>
                                <Image
                                    style={twrnc`w-full h-full`}
                                    source={Tour}
                                />
                            </View>
                            <View style={twrnc`w-4/6 gap-1`}>
                                <Text style={twrnc`font-bold ${ card === 'tour' ? 'text-[#FF5F00]' : ''}`} >
                                    Passeio
                                </Text>
                                <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                    Ideal para entregar pacotes pequenos, eletrônicos em geral
                                </Text>
                                <Text style={twrnc`justify-center items-center text-xs`}>
                                    <Feather name="box" size={15} color="black" /> até 200kg
                                </Text>
                            </View>
                        </Pressable >
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ card === 'util' ? 'border-[#FF5F00]' : ''}`}
                            onPress={()=>handleCard('util')}
                        >
                            <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center rounded-lg`}>
                                <Image
                                    style={twrnc`w-5/6 h-full`}
                                    source={Fiorino}
                                />
                            </View>
                            <View style={twrnc`w-4/6 gap-1`}>
                                <Text style={twrnc`font-bold ${ card === 'util' ? 'text-[#FF5F00]' : ''}`} >
                                    Utilitário
                                </Text>
                                <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                    Ideal para entregar pacotes médios, eletrodomésticos
                                </Text>
                                <Text style={twrnc`justify-center items-center text-xs`}>
                                    <Feather name="box" size={15} color="black" /> até 500kg
                                </Text>
                            </View>
                        </Pressable >
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ card === 'van' ? 'border-[#FF5F00]' : ''}`}
                            onPress={()=>handleCard('van')}
                        >
                            <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center rounded-lg`}>
                                <Image
                                    style={twrnc`w-5/6 h-full`}
                                    source={Van}
                                />
                            </View>
                            <View style={twrnc`w-4/6 gap-1`}>
                                <Text style={twrnc`font-bold ${ card === 'van' ? 'text-[#FF5F00]' : ''}`}>
                                    Van
                                </Text>
                                <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                    Ideal para entregar pacotes médios, lava e seca, televisão, fogão
                                </Text>
                                <Text style={twrnc`justify-center items-center text-xs `}>
                                    <Feather name="box" size={15} color="black" /> até 1000kg
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ card === 'vuc' ? 'border-[#FF5F00]' : ''}`}
                            onPress={()=>handleCard('vuc')}
                        >
                            <View style={twrnc`w-2/6 p-3 pr-2 justify-center items-center rounded-lg`}>
                                <Image
                                    style={twrnc`w-5/6 h-full`}
                                    source={CartLoad}
                                />
                            </View>
                            <View style={twrnc`w-4/6 gap-1`}>
                                    <Text style={twrnc`font-bold ${ card === 'vuc' ? 'text-[#FF5F00]' : ''}`}>
                                        Vuc
                                    </Text>
                                    <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                        Ideal para entregar pacotes grande, mudanças, geladeira
                                    </Text>
                                    <Text style={twrnc`justify-center items-center text-xs`}>
                                        <Feather name="box" size={15} color="black" /> até 1500kg
                                    </Text>
                            </View>
                        </Pressable>
                    </View>
            </ScrollView>
        </>
    )
}