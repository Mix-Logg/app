import { TouchableOpacity, Linking, View, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import twrnc from "twrnc";
export default function CardBanner({Title, Link, img}){
    const handlePress = () => {
        Linking.openURL(`${Link}`);
      };
    return(
        <TouchableOpacity style={twrnc`flex-row bg-[#FF5F00] border border-neutral-200 rounded-xl flex mr-3`} onPress={handlePress}>
            <View style={twrnc`justify-center ml-4 mt-4 mb-4`}>
                <Text style={twrnc`text-lg text-[#F4F4F4] font-extrabold w-36 mb-4 h-14`}>
                    {Title}
                </Text>
                <AntDesign name="arrowright" size={18} color="#f4f4f4" />
            </View>
            <View style={twrnc`rounded-r-xl bg-[#F4F4F4] h-full w-40`}>
                <Image style={twrnc`h-full w-full`} source={img} resizeMode="contain" />
            </View>
        </TouchableOpacity>
    )
}