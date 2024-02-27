import { View, Text, Pressable, Image, Modal, TextInput, Keyboard, ScrollView } from "react-native";
import twrnc from 'twrnc';
import { useState } from "react";
import FixBar from "../../../fixBar"
import { Feather } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
import PopUp from "../../../modal";
import CartLoad from '../../../../img/car/cartload.png'
import Van from '../../../../img/car/van.png'
import Fiorino from '../../../../img/car/fiorino.png'
export default function RegisterCarProfile({navigation}){
    const [plate, setPlate] = useState(false);
    const [car, setCar] = useState(false);
    const [popUp, setPopUp] = useState('');
    
    const modal = (option) => {
        if(option === 'car'){
            setPopUp(<PopUp type={'warning'} txt={'Você deve selecionar o tipo do veículo'} show={true} />)
            return;
        }
        if(option === 'plate'){
            setPopUp(<PopUp type={'warning'} txt={'Você deve digitar a placa do veículo'} show={true} />)
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
        await setPopUp('')
        if(!car){
            modal('car')
        }
        if(!plate){
            modal('plate')
            return;
        }

    }
    
    return(
        <ScrollView>
            {popUp}
            <View style={twrnc`h-200`}>
                <FixBar navigation={navigation} opition={'register'} />
                <View style={twrnc`p-5 gap-10`}>
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
                <View style={twrnc`items-center justify-center`}>
                    <Pressable style={twrnc`px-10 rounded-lg py-2 bg-[#FF5F00]`}
                        onPress={handleContinue}
                    >
                        <Text style={twrnc`font-bold text-white`}>Continuar</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}