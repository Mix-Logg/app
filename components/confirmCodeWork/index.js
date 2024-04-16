import { View, Text, Image, } from "react-native"
import ModalMid from "../modalMid"
import twrnc from "twrnc"
import WomanEye from '../../img/uniqueIcons/womanEye.png'
import Button from "../../util/button"
export default function ConfirmCodeSuccessful({handle}){
    return(
        <ModalMid>
           <View style={twrnc`bg-[#FF5F00] rounded-lg`}>
                <View style={twrnc`h-55 bg-[#FF5F00] rounded-lg p-2`}>
                    <View style={twrnc`flex-row bg-white rounded-lg`}>
                        <View style={twrnc`w-1/2 p-1 gap-2`}>
                            <Text style={twrnc`text-2xl font-medium text-[#FF5F00]`}>Sucesso !</Text>
                            <Text style={twrnc`text-base`}>Acabamos de confirmar com sucesso seu código, contamos com você pra completar o frete</Text>
                        </View>
                        <View style={twrnc`w-1/2`}>
                            <Image
                                style={twrnc`w-full h-full`}
                                source={WomanEye}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
                <Button handle={handle}>
                    <Text style={twrnc`text-white text-lg font-medium`}>Continuar</Text>
                </Button>
           </View>
        </ModalMid>
    )
}