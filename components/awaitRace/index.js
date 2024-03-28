
import { View, Text, Image } from "react-native";
import twrnc from "twrnc";
import Characters from '../../img/uniqueIcons/characters.png'
export default function WaitRace(){
    return(
        <View style={twrnc`h-full w-full p-10`}>
            <View style={twrnc`gap-7`}>
                <View style={twrnc`h-80`}>
                    <Image
                        style={twrnc`w-full h-full`}
                        source={Characters}
                        resizeMode="contain"
                    />
                </View>
                <View style={twrnc`items-center justify-center`}>
                    <Text style={twrnc`font-bold text-2xl`}>
                        A MIX está trabalhando para conseguir mais fretes!
                    </Text>
                </View>
            </View>
        </View>
    )
}