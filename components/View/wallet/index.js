import { ScrollView, View, Text, Image, TouchableOpacity  } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import FixBar from "../../fixBar";
import Woman from '../../../img/uniqueIcons/woman.png'
export default function Wallet({navigation}){
   
    const handleClickContinue = () => {
        navigation.navigate('RegisterPerson')
    }

    return(
        <>
          
            <FixBar navigation={navigation} opition={'wallet'} />
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
                            Vamos completar seu registro !
                        </Text>
                    </View>
                    <View className='px-5 items-center justify-center mt-2'>
                        <Text className='text-xs w-60 text-neutral-400 text-justify'>
                            Para podermos liberar o seu dinheiro, vamos criar uma carteira virtual com o nosso parceiro
                        </Text>
                    </View>
                </View>
                <View className='items-center mt-10'>
                    <TouchableOpacity className='rounded-full h-12 w-12 items-center justify-center bg-primary'
                        onPress={()=>handleClickContinue()}
                    >
                        <MaterialIcons name="arrow-forward" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}