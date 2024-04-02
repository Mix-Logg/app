import ModalMid from "../modalMid"
import { View, Text, Image, Linking, BackHandler } from "react-native"
import Button from "../../util/button"
import Woman from '../../img/uniqueIcons/woman.png'
import twrnc from "twrnc"
export default function LocationDenied(){

    const handleSetting = () => {
        Linking.openSettings();
        BackHandler.exitApp();
    }

    return(
        <ModalMid>
            <View style={twrnc`flex-row h-60`}>
                <View style={twrnc`w-1/2 p-3 gap-5`}>
                    <View style={twrnc`gap-3`}>
                        <Text style={twrnc`text-2xl font-medium text-[#FF5F00]`}>Ei, atenção!</Text>
                        <Text style={twrnc`font-medium`}>Precisamos que você libere o acesso a localização ao nosso app</Text>
                        <Text style={twrnc`text-xs font-bold text-neutral-500`}>Caso você já fez esse processo, reinicie o app</Text>
                    </View>
                    <View>
                        <Button background="bg-[#FF5F00]" handle={handleSetting} >
                            <View>
                                <Text style={twrnc`font-bold text-white text-lg`}>Vamos lá</Text>
                            </View>
                        </Button>
                    </View>
                </View>
                <View style={twrnc`w-1/2`}>
                    <View>
                        <Image
                            source={Woman}
                            resizeMode="contain"
                            style={twrnc`h-full w-full`}
                        />
                    </View>
                </View>
            </View>
        </ModalMid>
    )
}