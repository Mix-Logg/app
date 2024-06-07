import { View,Text, TouchableOpacity} from "react-native"
import { useRoute } from '@react-navigation/native';
import SuccessFullPix from "../../successPix"
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
export default function ExtractDetails(){
    const route = useRoute();
    const navigation = useNavigation()

    const handleBack = () => {
        navigation.navigate('Extract')
    }

    return(
        <View className='p-5 bg-white h-full'>
            <View className='w-full flex-row items-center justify-between mb-14'>
                <TouchableOpacity className='bg-primary w-9 h-9 justify-center items-center rounded-lg'
                    onPress={handleBack}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-primary mr-5'>
                    Detalhe
                </Text>
            </View>
            <View className='bg-white'>
                <SuccessFullPix create_at={route.params.create_at} amount={route.params.amount} tax={route.params.tax} taxPix={route.params.taxPix} taxFull={route.params.taxFull} pix={route.params.pix} id={route.params.id} />
            </View>
        </View>
    )
}