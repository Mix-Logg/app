import { View, Text, Pressable, Image, ScrollView, SafeAreaView } from "react-native"
import twrnc from 'twrnc';
import { useState } from "react";
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


import Btn from "../../../btn";
export default function RegisterCarProfile({navigation}){
    const [plate, setPlate] = useState(false);
    const [card, setCard] = useState(false);
    const [am, setAm] = useState(false);
    const [popUp, setPopUp] = useState('');
    
    const modal = async (option) => {
        setPopUp('')
        if(option === 'card'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve selecionar uma opção entre Auxiliar ou Veículos'} show={true} />)
            return;
        }
        if(option === 'plate'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar a placa do veículo'} show={true} />)
            return;
        }
    }
    
    const handlePlate = (text) =>{
        setPlate(text.toUpperCase())
    }

    const handleCard = (cardType) =>{
        if(cardType === 'auxiliary'){
            setAm('auxiliary');
            setCard(cardType);
            return;
        }
        if(cardType === 'motorcycle'){
            setAm('motorcycle');
            setCard(cardType);
            return;
        }
        if(cardType === 'tour'){
            setAm('tour');
            setCard(cardType);
            return;
        }
        setAm('driver');
        setCard(cardType);
        return;
    }

    const handleContinue = async () => {
        await setPopUp('')
        if(!card){
            modal('card')
        }
        if(!plate && card != 'auxiliary'){
            modal('plate')
            return;
        }
        if(card === 'auxiliary'){
            const param = {
                user:{
                    am:am
                }
            }
            navigation.navigate('RegisterUser', param);
            return;
        }
        const param = {
            user:{
                am:am,
            },
            vehicle:{
                typeVehicle: card,
                plate:plate
            }
        }
        navigation.navigate('RegisterUser', param)
    }
    
    return(
        <SafeAreaView >
            <FixBar navigation={navigation} opition={'register'} />
            <ScrollView style={twrnc`bg-white`}>
                {popUp}
                    <View style={twrnc`p-5 gap-5`}>
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white     ${ card === 'auxiliary' ? 'border-[#FF5F00]' : ''}`}
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
                                    Auxiliar
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
                            <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center bg-[#ff5f00] rounded-lg`}>
                                <Image
                                    style={twrnc`w-4/6 h-full`}
                                    resizeMode="contain"
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
                                    <Feather name="box" size={15} color="black" /> até 30kg
                                </Text>
                            </View>
                        </Pressable >
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ card === 'tour' ? 'border-[#FF5F00]' : ''}`}
                            onPress={()=>handleCard('tour')}
                        >
                            <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center bg-[#ff5f00] rounded-lg`}>
                                <Image
                                    style={twrnc`w-4/6 h-full`}
                                    resizeMode="contain"
                                    source={Tour}
                                />
                            </View>
                            <View style={twrnc`w-4/6 gap-1`}>
                                <Text style={twrnc`font-bold ${ card === 'tour' ? 'text-[#FF5F00]' : ''}`} >
                                    Passeio
                                </Text>
                                <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                    Ideal para entregar compras, pacotes pequenos, eletrodomesticos
                                </Text>
                                <Text style={twrnc`justify-center items-center text-xs`}>
                                    <Feather name="box" size={15} color="black" /> até 300kg
                                </Text>
                            </View>
                        </Pressable >
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ card === 'util' ? 'border-[#FF5F00]' : ''}`}
                            onPress={()=>handleCard('util')}
                        >
                            <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center bg-[#ff5f00] rounded-lg`}>
                                <Image
                                    style={twrnc`w-4/6 h-full`}
                                    resizeMode="contain"
                                    source={Fiorino}
                                />
                            </View>
                            <View style={twrnc`w-4/6 gap-1`}>
                                <Text style={twrnc`font-bold ${ card === 'util' ? 'text-[#FF5F00]' : ''}`} >
                                    Utilitário
                                </Text>
                                <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                    Ideal para pacotes médios, Ar condicionado, Frigobar
                                </Text>
                                <Text style={twrnc`justify-center items-center text-xs`}>
                                    <Feather name="box" size={15} color="black" /> até 500kg
                                </Text>
                            </View>
                        </Pressable >
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ card === 'van' ? 'border-[#FF5F00]' : ''}`}
                            onPress={()=>handleCard('van')}
                        >
                            <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center bg-[#ff5f00] rounded-lg`}>
                                <Image
                                    style={twrnc`w-4/6 h-full`}
                                    resizeMode="contain"
                                    source={Van}
                                />
                            </View>
                            <View style={twrnc`w-4/6 gap-1`}>
                                <Text style={twrnc`font-bold ${ card === 'van' ? 'text-[#FF5F00]' : ''}`}>
                                    Van
                                </Text>
                                <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                    Ideal para pacotes grande, Geladeira, Lava e seca, Televisão, Fogão
                                </Text>
                                <Text style={twrnc`justify-center items-center text-xs `}>
                                    <Feather name="box" size={15} color="black" /> até 1000kg
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable style={twrnc`bg-[#fafafa] h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ card === 'vuc' ? 'border-[#FF5F00]' : ''}`}
                            onPress={()=>handleCard('vuc')}
                        >
                            <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center bg-[#ff5f00] rounded-lg`}>
                                <Image
                                    style={twrnc`w-4/6 h-full`}
                                    resizeMode="contain"
                                    source={CartLoad}
                                />
                            </View>
                            <View style={twrnc`w-4/6 gap-1`}>
                                    <Text style={twrnc`font-bold ${ card === 'vuc' ? 'text-[#FF5F00]' : ''}`}>
                                        Vuc
                                    </Text>
                                    <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                        Ideal para mudanças e pacotes grande em quantidade, Rolos de tecido 
                                    </Text>
                                    <Text style={twrnc`justify-center items-center text-xs`}>
                                        <Feather name="box" size={15} color="black" /> até 1500kg
                                    </Text>
                            </View>
                        </Pressable>
                    </View>
                    { card === 'auxiliary' || card === false ?
                    '' : 
                    <View style={twrnc`mb-8 py-3 px-5`}>
                        <View style={twrnc`w-3/6`}>
                            <Text style={twrnc`text-base`}>
                                Placa do Veículo
                            </Text>
                                <MaskInput
                                    style={twrnc`p-3 text-lg bg-white rounded-lg w-full border border-[#d4d4d4]`}
                                    value={plate}
                                    maxLength={8}
                                    autoCapitalize="characters"
                                    placeholder="Digite"
                                    onChangeText={handlePlate}
                                ></MaskInput>
                        </View>
                    </View> 
                    }
                    <Btn title={'Continue'} action={handleContinue} />
            </ScrollView>
        </SafeAreaView>
    )
}