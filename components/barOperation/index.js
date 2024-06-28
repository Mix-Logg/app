import { View, Text, TouchableOpacity,  } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
export default function BarOperation(){
    const navagation = useNavigation()
    return(
        <View className='bg-primary h-20 p-3 items-center flex-row'>
            <TouchableOpacity className='bg-white h-8 w-8 justify-center items-center rounded-lg'
                onPress={()=>navagation.navigate('Home')}
            >
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#FF5F00" />
            </TouchableOpacity>
            <View>
                <Text className='text-white font-semibold ml-4'>Operação Dísponivel</Text>
            </View>
        </View>
    )
}