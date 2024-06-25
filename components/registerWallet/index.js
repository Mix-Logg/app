import { ScrollView, View, Text, Image, TouchableOpacity, Linking, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import Woman from '../../img/uniqueIcons/woman.png'
import RegisterWallet from "../../hooks/registerWallet";
import { useNavigation } from "@react-navigation/native";
import colors from "tailwindcss/colors";
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
export default function WalletRegister(){
    const [loader,setLoader]=useState(false)
    const navigation = useNavigation()

    const handleClickContinue = async () => {
        navigation.navigate('RegisterWalletStepOne')
    }

    return(
        <>
            <ScrollView className="bg-white py-6">
                <View className='h-52'>
                        <Image
                            source={Woman}
                            className='w-full h-full'
                            resizeMode="contain"
                        />
                </View>
                <View>
                    <View className='items-center'>
                        <Text className='text-xl text-primary font-extrabold'>
                            Estamos completando seu registro !
                        </Text>
                    </View>
                    <View className='px-5 items-center justify-center mt-2'>
                        <Text className='text-xs w-60 text-neutral-400 text-justify'>
                            Para podermos liberar o seu dinheiro, estamos criando uma carteira virtual com o nosso parceiro
                            e você deve aguarda <Text className='font-bold text-primary'>até 48h</Text> para liberação da carteira
                        </Text>
                    </View>
                </View>
                <TouchableOpacity className='mt-10 flex-row items-center justify-center '>
                    <View className='flex-row items-center'>
                        <MaterialCommunityIcons
                            name="headset"
                            size={24}
                            color={colors.neutral[500]}
                        />
                        <Text className='text-neutral-600 text-lg font-bold ml-2'>Suporte</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </>
    )
}