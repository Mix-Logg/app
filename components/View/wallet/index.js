import { ScrollView, View, Text, Image, TouchableOpacity, Linking, ActivityIndicator, StatusBar } from "react-native";
import { Fontisto , Ionicons, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import FixBar from "../../fixBar";
import findUser from "../../../hooks/findUser";
import RegisterWallet from "../../../hooks/registerWallet";
import Mask from "../../../hooks/mask";
import Wating from "../../wating";
import ModalAdvance from "../../modalAdvance";
export default function Wallet({navigation}){
    const [loader, setLoader]=useState(false)
    const [info, setInfo]=useState(false)
    const [eye, setEye]=useState(false)
    const [amount, setAmount]=useState('')
    const [amountHidden, setAmountHidden]=useState(null)
    const [modalAdvance, setModalAdvance] = useState('')
    
    useEffect(()=>{
        const fetchData = async () => {
            const user  = await findUser();
            setAmount(Mask('amount',user.amount))
            setAmountHidden(Mask('amountHidden', user.amount))
        }
        fetchData()
    },[])
   
    const handleClickContinue = async () => {
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
        }, 5000);
        const linkRegister = await RegisterWallet();
        Linking.openURL(linkRegister.url).catch((err) =>
            console.error('Erro ao abrir o URL: ', err)
        );
        return;
    }

    const handleEye = async () => {
        setEye(!eye)
    }

    const handleInfo = async () => {
        setInfo(!info)
    }

    const handleAdvance = async () => {
        await setModalAdvance('')
        setModalAdvance(<ModalAdvance/>)
    }

    return(
        <>
            { amountHidden ?
                <>
                    {modalAdvance}
                    <FixBar navigation={navigation} opition={'wallet'} color={true}/>
                    <StatusBar backgroundColor='#FF5F00' />
                        {info && 
                            <View className='absolute top-40 w-full items-end '>
                                <View className='bg-white p-3 z-10 rounded shadow-xl w-1/2 shadow-black right-6'>
                                    <Text className='text-justify text-xs'>
                                        O pagamento é depositado automaticamente após 7 dias que o saldo fica dísponivel no aplicativo
                                    </Text>
                                </View>
                            </View>
                        }
                    <View className='bg-white'>
                        <View className='bg-primary py-5 rounded-b-2xl'>
                            <View className='px-3 mt-1'>
                                <View className='items-center'>
                                    <Text className='text-xs text-white'>Saldo</Text>
                                    <View className='flex-row items-center '>
                                            { eye ?
                                                <Text className='text-white text-3xl font-bold mr-2'>
                                                    {amount} 
                                                </Text> 
                                                :
                                                <Text className='text-white text-3xl font-bold mr-2'>{amountHidden}</Text>
                                            }
                                            <TouchableOpacity 
                                                onPress={handleEye}
                                            >
                                                { eye ?
                                                    <Ionicons name="eye" size={24} color="white"/>
                                                    :
                                                    <Ionicons name="eye-off" size={24} color="white" />
                                                }
                                            </TouchableOpacity>
                                    </View>
                                    <View className='justify-end items-end w-full flex-row'>
                                            <TouchableOpacity className='h-5 w-5 border bg-white border-[#FF5F00] rounded-full items-center justify-center mr-1'
                                                onPress={handleInfo}
                                            >
                                                <Fontisto name="info" size={10} color="#FF5F00" />
                                            </TouchableOpacity>
                                    </View>                                    
                                </View>
                            </View>
                        </View>
                    </View>
                    <ScrollView className="bg-white py-6 rounded-b-2xl">
                            <View>
                                <View>
                                    <Text className='px-4 text-xl text-neutral-500 font-medium'>Opções de contas</Text>
                                </View>
                            <View className='flex-row px-5 mt-5'>
                                    <View className='items-center mr-5 '>
                                        <TouchableOpacity className='h-14 w-14 border border-primary rounded-xl items-center justify-center'
                                            onPress={handleAdvance}
                                        >
                                            <FontAwesome6 name="arrows-rotate" size={24} color="#FF5F00" />
                                        </TouchableOpacity>
                                        <Text className='text-xs mt-1 text-neutral-500'>Adiantamento</Text>
                                    </View>
                                    <View className='items-center mr-5' >
                                        <TouchableOpacity className='h-14 w-14 border border-primary rounded-xl justify-center items-center'>
                                            <Ionicons name="ticket" size={24} color="#FF5F00" />
                                        </TouchableOpacity>
                                        <Text className='mt-1 text-xs text-neutral-500'>Extrato</Text>
                                    </View>
                                    <View className='items-center mr-5'>
                                        <TouchableOpacity className='h-14 w-14 border border-primary rounded-xl items-center justify-center'>
                                            <Ionicons name="settings-sharp" size={24} color="#FF5F00" />
                                        </TouchableOpacity>
                                        <Text className='text-xs text-neutral-500 mt-1'>Editar dados</Text>
                                    </View>
                                    {/* <View className='items-center '>
                                        <TouchableOpacity className='h-14 w-14 border border-primary rounded-full items-center justify-center'>
                                            <Fontisto name="info" size={24} color="#ff5f00" />
                                        </TouchableOpacity>
                                        <Text className='text-xs text-neutral-500 mt-1'>
                                            informações
                                        </Text>
                                    </View> */}
                            </View>
                            </View>
                            <View>
                                <Text>

                                </Text>
                            </View>
                    </ScrollView>
                </>
                :
                <Wating/>
            }
        </>
    )
}