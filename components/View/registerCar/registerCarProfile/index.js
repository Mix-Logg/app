import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
export default function RegisterCarProfile({navigation}){
    const [plate, setPlate] = useState(false);
    const [car, setCar] = useState(false);
    const [popUp, setPopUp] = useState('');

    
    
    const modal = async (option) => {
        if(option === 'car'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve selecionar o tipo do veículo'} show={true} />)
            return;
        }
        if(option === 'plate'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar a placa do veículo'} show={true} />)
            return;
        }
    }
    
    const handlePlate = (text) =>{
        setPlate(text)
    }

    const handleCar = (carType) =>{
        setCar(carType)
    }

    const handleContinue = async () => {
        setPopUp('')
        if(!car){
            modal('car')
        }
        if(!plate){
            modal('plate')
            return;
        }

    }
    
    return(
        <KeyboardAwareScrollView style={twrnc`bg-white`}>
            {popUp}
            <View style={twrnc`h-200`}>
                <FixBar navigation={navigation} opition={'register'} />
                <View style={twrnc`p-5 gap-10`}>
                    {<Pressable style={twrnc`hidden bg-white h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ car === 'motorcycle' ? 'border-[#FF5F00]' : ''}`}
                        onPress={()=>handleCar('motorcycle')}
                    >
                        <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center `}>
                            <Image
                                style={twrnc`w-4/6 h-full`}
                                resizeMode="contain"
                                source={Motorcycle}
                            />
                        </View>
                        <View style={twrnc`w-4/6 gap-1`}>
                            <Text style={twrnc`font-bold ${ car === 'motorcycle' ? 'text-[#FF5F00]' : ''}`} >
                                Moto
                            </Text>
                            <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                Perfeitos para eletrodomesticos e material de construção
                            </Text>
                            <Text style={twrnc`justify-center items-center text-xs`}>
                                <Feather name="box" size={15} color="black" /> até 500kg
                            </Text>
                        </View>
                    </Pressable >}
                    <Pressable style={twrnc`bg-white h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ car === 'tour' ? 'border-[#FF5F00]' : ''}`}
                        onPress={()=>handleCar('tour')}
                    >
                        <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center `}>
                            <Image
                                style={twrnc`w-4/6 h-full`}
                                resizeMode="contain"
                                source={Tour}
                            />
                        </View>
                        <View style={twrnc`w-4/6 gap-1`}>
                            <Text style={twrnc`font-bold ${ car === 'tour' ? 'text-[#FF5F00]' : ''}`} >
                                Passeio
                            </Text>
                            <Text style={twrnc`text-xs text-[#7B7B7B] font-medium`}>
                                Perfeitos para eletrodomesticos e material de construção
                            </Text>
                            <Text style={twrnc`justify-center items-center text-xs`}>
                                <Feather name="box" size={15} color="black" /> até 500kg
                            </Text>
                        </View>
                    </Pressable >
                    <Pressable style={twrnc`bg-white h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ car === 'util' ? 'border-[#FF5F00]' : ''}`}
                        onPress={()=>handleCar('util')}
                    >
                        <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center `}>
                            <Image
                                style={twrnc`w-4/6 h-full`}
                                resizeMode="contain"
                                source={Fiorino}
                            />
                        </View>
                        <View style={twrnc`w-4/6 gap-1`}>
                            <Text style={twrnc`font-bold ${ car === 'util' ? 'text-[#FF5F00]' : ''}`} >
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
                    <Pressable style={twrnc`bg-white h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ car === 'van' ? 'border-[#FF5F00]' : ''}`}
                        onPress={()=>handleCar('van')}
                    >
                        <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center `}>
                            <Image
                                style={twrnc`w-4/6 h-full`}
                                resizeMode="contain"
                                source={Van}
                            />
                        </View>
                        <View style={twrnc`w-4/6 gap-1`}>
                            <Text style={twrnc`font-bold ${ car === 'van' ? 'text-[#FF5F00]' : ''}`}>
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
                    <Pressable style={twrnc`bg-white h-25 rounded-lg p-3 flex-row gap-3 border border-white ${ car === 'cartload' ? 'border-[#FF5F00]' : ''}`}
                        onPress={()=>handleCar('cartload')}
                    >
                        <View style={twrnc`w-2/6 p-2 pr-2 justify-center items-center`}>
                            <Image
                                style={twrnc`w-4/6 h-full`}
                                resizeMode="contain"
                                source={CartLoad}
                            />
                        </View>
                        <View style={twrnc`w-4/6 gap-1`}>
                                <Text style={twrnc`font-bold ${ car === 'cartload' ? 'text-[#FF5F00]' : ''}`}>
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
                <View style={twrnc`mt-2 mb-3 px-20 py-3 bg-black`}>
                    <Text style={twrnc`text-base`}>
                        Placa do Veículo
                    </Text>
                        <MaskInput
                            style={twrnc`p-3 text-lg bg-white rounded-lg w-full border border-[#d4d4d4]`}
                            value={plate}
                            maxLength={8}
                            autoCapitalize="none"
                            placeholder="Digite"
                            onChangeText={handlePlate}
                        ></MaskInput>
                </View>
                <View style={twrnc`items-center justify-center`}>
                    <Pressable style={twrnc`px-10 rounded-lg py-2 bg-[#FF5F00]`}
                        onPress={handleContinue}
                    >
                        <Text style={twrnc`font-bold text-white`}>Continuar</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}