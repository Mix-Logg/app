import { View, Text, ScrollView, StatusBar, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Octicons, FontAwesome6, Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import FixBar from "../fixBar"
import colors from "tailwindcss/colors";
export default function RegisterWalletStepOne(){
    const navigation = useNavigation()
    return(
        <>
            <FixBar navigation={navigation} opition={'wallet'} color={true}/>
            <StatusBar backgroundColor='#FF5F00' />
            <ScrollView className='p-5'>
                <View>
                    <View>
                        <Text className='text-lg font-bold text-primary'>
                            Verificar dados
                        </Text>
                    </View>
                    <View className='mt-8 p-5'>
                        <TouchableOpacity className='flex-row items-center justify-between'>
                            <View className='flex-row items-center'>
                                <FontAwesome6 name="contact-card" size={24} color={colors.neutral[500]} />
                                <Text className='text-lg text-neutral-600 font-bold ml-3'>Dados Pessoais</Text>
                            </View>
                            <Entypo name="chevron-small-right" size={24} color={colors.neutral[500]} />
                        </TouchableOpacity>
                        <TouchableOpacity className='mt-10 flex-row items-center justify-between'>
                            <View className='flex-row items-center'>
                                <Octicons name="location" size={24} color={colors.neutral[500]} />
                                <Text className='text-neutral-600 text-lg font-bold ml-5'>Endreço</Text>
                            </View>
                            <Entypo name="chevron-small-right" size={24} color={colors.neutral[500]} />
                        </TouchableOpacity>
                        <TouchableOpacity className='mt-10 flex-row items-center justify-between'>
                            <View className='flex-row items-center'>
                                <MaterialCommunityIcons
                                    name="headset"
                                    size={24}
                                    color={colors.neutral[500]}
                                />
                                <Text className='text-neutral-600 text-lg font-bold ml-4'>Ajuda</Text>
                            </View>
                            <Entypo name="chevron-small-right" size={24} color={colors.neutral[500]} />
                        </TouchableOpacity>
                    </View>
                    <View className='mt-10 p-5 flex-row items-center'>
                        <Feather name="info" size={24} color="#FF5F00" />
                        <Text className='text-justify ml-3 w-10/12 text-neutral-600 font-semibold'>
                        Confirme seus dados clicando nos ícones. Preste muita atenção, 
                        pois seus dados serão avaliados. 
                        Em até 48 horas, você estará liberado para saques e movimentações bancárias.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}