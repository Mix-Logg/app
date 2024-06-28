import { View, Text, ScrollView, Image, TouchableOpacity  } from "react-native"
import BarOperation from "../../barOperation"
import FastShop from '../../../img/partners/logoFastShop.png'
import Frubana from '../../../img/partners/logoFrubana.png'
import Americanas from '../../../img/partners/logoAmericanas.png'
import GPA from '../../../img/partners/logoGpa.png'
import Brasil from '../../../img/flag/brasil.png'
import Deliverys from '../../../img/uniqueIcons/deliverys.png'
export default function NoHaveOperation(){
    return(
        <View className='bg-white h-full'>
            <ScrollView>
                <BarOperation/>
                <View className='bg-white'>
                    <View className='bg-primary w-full py-5' style={{borderBottomLeftRadius:80}}>
                        <View className='w-full items-center justify-center'>
                            <Text className='font-bold text-white text-xl'>+ de 2.000.000 milhões de entregas</Text>
                            <View className='h-8 w-8 items-center mb-1'>
                                <Image
                                    className={`w-full h-full`}
                                    source={Brasil}
                                    resizeMode={"contain"}
                                />
                            </View>
                            <View className='bg-white h-1 w-4/6 rounded'></View>
                        </View>
                        <View className='w-full mt-5'>
                            <View className='items-center'>
                                <Text className='text-white text-lg font-bold'>Clientes</Text>
                            </View>
                            <View className='justify-center items-center mt-2'>
                                <View className='w-3/4 bg-white rounded px-5 mb-5'>
                                    <View className='flex-row gap-16 '>
                                        <View className='h-20 w-20 items-center'>
                                            <Image
                                                className={`w-full h-full`}
                                                source={FastShop}
                                                resizeMode={"contain"}
                                            />
                                        </View>
                                        <View className='h-20 w-20 '>
                                            <Image
                                                className={`w-24 h-24`}
                                                source={Frubana}
                                                resizeMode={"contain"}
                                            />
                                        </View>
                                    </View>
                                    <View className='flex-row gap-16 '>
                                        <View className='h-20 w-20 items-center'>
                                            <Image
                                                className={`w-full h-full`}
                                                source={Americanas}
                                                resizeMode={"contain"}
                                            />
                                        </View>
                                        <View className='h-20 w-20 '>
                                            <Image
                                                className={`w-20 h-20`}
                                                source={GPA}
                                                resizeMode={"contain"}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View className='bg-white w-full py-5' style={{borderBottomLeftRadius:100}}>
                        <View className='items-center'>
                            <Text className='text-lg font-bold'>Você não tem operação?</Text>
                        </View>
                        <View className='items-center'>
                            <Text className='mt-3 w-60 font-light'>
                                Percebemos que você não tem operação, entre em contato e carregue <Text className='font-bold text-primary'>todo dia!</Text>
                            </Text>
                            <View className='h-24 w-24 items-center mt-1'>
                                <Image
                                    className={`w-full h-full`}
                                    source={Deliverys}
                                    resizeMode={"contain"}
                                />
                            </View>
                            <TouchableOpacity className='mt-8 w-1/2 h-8 justify-center items-center rounded-lg bg-primary'>
                                <Text className='text-white text-lg font-bold'>
                                    Eu quero!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}