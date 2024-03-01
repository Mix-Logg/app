import twrnc from "twrnc";
import { View, Text, Pressable } from "react-native";

export default function btn({title, action}){
    return(
        <View style={twrnc`items-center justify-center mb-20`}>
            <Pressable style={twrnc`px-10 rounded-lg py-2 bg-[#FF5F00]`}
                onPress={action}
            >
                <Text style={twrnc`font-bold text-white`}>{title}</Text>
            </Pressable>
        </View>
    )
}