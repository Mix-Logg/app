import { View, Text, TouchableOpacity } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
export default function AccessOperation(){
    const navigation = useNavigation()

    const handleGo = (where) => {
        switch (where) {
            case 'vailability':
                navigation.navigate('WorkOperationToday')
                break;
        
            default:
                break;
        }
    }


    return(
        <View className='mt-10 px-5'>
            <TouchableOpacity className='border border-neutral-300 h-28 w-2/6 rounded '
                onPress={()=>handleGo('vailability')}
            >
                <View className='p-3'>
                    <FontAwesome name="calendar" size={24} color="#FF5F00" />
                </View>
                <View className='items-center justify-center h-3/4'>
                    <Text className='text-xs font-bold text-primary'>Disponibilidade</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}