import twrnc from "twrnc"
import { View, Text } from "react-native"
import ModalBottom from "../modalBottom"
import MaskInput from 'react-native-mask-input';
import { useState } from "react";
import Button from '../../util/button'
import PopUp from "../modal";
import { MaterialIcons } from '@expo/vector-icons';
export default function CadasterPlate({am, navigation, setModalBottom, vehicle}){
    const [plate, setPlate]= useState('')
    const [popUp, setPopUp] = useState('');

    const handleContinue = async () => {
        await setPopUp('')
        if(plate.length < 3 ){
            await modal('plate')
            return;
        }
        const param = {
            user:{
                am:am,
            },
            vehicle:{
                typeVehicle: am == 'driver' ? vehicle : am,
                plate:plate
            }
        }
        await setModalBottom('')
        navigation.navigate('RegisterUser', param)
    }

    const modal = async (option) => {
        setPopUp('')
        if(option === 'plate'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar a placa do veículo'} show={true} />)
            return;
        }
    }

    return(
        <ModalBottom>
            {popUp}
            <View style={twrnc`py-5 gap-17`}>
                <View style={twrnc`gap-2`}>
                    <Text style={twrnc`text-3xl font-bold`}>Digite sua placa</Text>
                    <Text style={twrnc`text-base`}>Digite corretamente a placa do veículo para continuar com o cadastro</Text>
                </View>
                <View style={twrnc`border-b border-[#a3a3a3] text-2xl py-1`}>
                    <MaskInput
                        style={twrnc`text-2xl py-1`}
                        value={plate}
                        onChangeText={(masked, unmasked)=>setPlate(unmasked)}
                        maxLength={8}
                        placeholder="Placa do veículo"
                    />
                </View>
                <View style={twrnc`items-end`}>
                    <Button handle={handleContinue}>
                        <View style={twrnc`rounded-full p-2 bg-[#FF5F00]`}>
                            <MaterialIcons name="keyboard-arrow-right" size={28} color="white" />
                        </View>
                    </Button>
                </View>
            </View>
        </ModalBottom>
    )
}