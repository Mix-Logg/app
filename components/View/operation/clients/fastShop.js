import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity, Linking } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { MaterialCommunityIcons, FontAwesome6, AntDesign, Feather } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import MaskInput, { Masks } from 'react-native-mask-input';
import FastShopLogo from '../../../../img/partners/logoFastShop.png'
import MixLogo from '../../../../img/logo/logoAsa.png'
import FindOneTeam from "../../../../hooks/findOneTeam";
import Wating from "../../../wating";
import CreateOperationToday from "../../../../hooks/createOperationToday";
import findOneOperationToday from "../../../../hooks/findOneOperationToday";
import CancelOperationToday from "../../../cancelOperationToday";
import DeleteOperationToday from "../../../../hooks/deleteOperationToday";
import UpdateOperationToday from "../../../../hooks/updateOperationToday";
export default function FastShop(){
    const navigation = useNavigation();

    const [today, setToday]   = useState('00/00/0000');
    const [dateWork, setDateWork]   = useState('00/00/0000');
    const [auxiliary, setAuxiliary] = useState(null);
    const [idAuxiliary, setIdAuxiliary] = useState(null);
    const [driver, setDriver]       = useState(null);
    const [idDriver, setIdDriver]   = useState(null);
    const [vehicle, setVehicle]     = useState(null);
    const [id, setId]               = useState(null);
    const [status, setStatus]     = useState(null);
    const [hasConfirm, setHasConfirm] = useState(null);
    const [timeExpired, setTimeExpired]   = useState(false);
    const [modalCancel, setModalCancel]   = useState(null);

    const handleHelp = async () => {
        const phoneNumber = '5511978612671';
        const message = `Olá, preciso de ajuda com minha operação #${id}`
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        Linking.openURL(url)
            .catch(err => console.error('Erro ao abrir o WhatsApp:', err));
    };  

    const handleSubmitConfirm = async () => {
        const paramsConfirm = {
            date       :dateWork,
            team       :JSON.stringify({
                            driver   :driver,
                            auxiliary:auxiliary
                        }),
            operation  :'Fast-Shop',
            idAuxiliary:idAuxiliary,
            idDriver   :idDriver,
            status     :'pending'
        };
        const response = await CreateOperationToday(paramsConfirm);
        if(response.status == 201){
            setStatus('pending')
            setHasConfirm(true)
            return
        }
    };

    const getTomorrowDate =  () => {
        const today = new Date();
        const tomorrow = new Date(today);
        const currentMinutes = today.getMinutes();
        const currentHour    = today.getHours();
        if ((currentHour > 12 || (currentHour === 12 && currentMinutes >= 0)) &&
            (currentHour < 16 || (currentHour === 16 && currentMinutes <= 30))) {
            setTimeExpired(false);
        } else {
            setTimeExpired(true);
        }
        tomorrow.setDate(today.getDate() + 1);
        if (tomorrow.getDay() == 0) {
            return false;
        }
        const dayToday   = String(today.getDate()).padStart(2, '0');
        const monthToday = String(today.getMonth() + 1).padStart(2, '0');
        const yearToday  = today.getFullYear();
        // setToday(`${dayToday}/${monthToday}/${yearToday}`)
        const day   = String(tomorrow.getDate()).padStart(2, '0');
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
        const year  = tomorrow.getFullYear();
        setToday(`${day}/${month}/${year}`)
        return `${day}/${month}/${year}`;
    };

    const handleCancel = async () => {
        await setModalCancel('')
        setModalCancel(<CancelOperationToday status={status}/>)
    }

    useEffect(()=>{
        const fetchData = async () => {
            const team = await FindOneTeam();
            setId(team.id)
            setAuxiliary(team.nameAuxiliary)
            setDriver(team.nameDriver)
            setIdDriver(team.idDriver)
            setIdAuxiliary(team.idAuxiliary)
            setVehicle(team.vehicle)
            const date  = getTomorrowDate();
            const check = await findOneOperationToday()
            if(check.status != 500 ){
                if(check.date == date){
                    if(check.status == 'cancel'){
                        const response = await DeleteOperationToday(check.id);
                        if(response.status == 200){
                            const operation_param = {
                                occurrence: 'Cliente sem carga'
                            }
                            await UpdateOperationToday(check.id,operation_param)
                            return
                        }
                        return
                    }
                    if(check.status == 'confirm'){
                        
                    }
                    let team = JSON.parse(check.team)
                    setHasConfirm(true)
                    setStatus(check.status)
                    setAuxiliary(team.auxiliary)
                    setDriver(team.driver)
                }
            }
            setDateWork(date)
        }
        fetchData()
    },[])

    return(
        <>
            {modalCancel}
            { vehicle && auxiliary && driver && dateWork ?
                <>
                    <StatusBar backgroundColor={'black'}/>
                    <View className='h-20 bg-black rounded-b-3xl justify-center px-3'>
                        <View className='justify-between flex-row items-center'>
                            <TouchableOpacity className='flex-row items-center'
                                onPress={() => navigation.navigate('Home')}
                            >
                                <AntDesign name="arrowleft" size={18} color="white" />
                                <Text className='text-white text-lg ml-2'>voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView className='p-5'>
                        <View className='h-24 w-24'>
                            <Image
                                source={FastShopLogo}
                                className='w-full h-full'
                                resizeMode="contain"
                            />
                        </View>
                        {   !dateWork ?
                            <>
                                <View className='items-center mt-5'>
                                    <Text className='font-light text-lg'>Amanhã não tem carregamento</Text>
                                </View>
                            </>
                            :
                            <>
                                { hasConfirm ?
                                    <>
                                        { today == dateWork ? 
                                            <>
                                                <View>
                                                    <View>
                                                        <Text className='text-xl font-bold'>Bom dia!</Text>
                                                        <Text className='text-xl font-light'>
                                                            Pronto para mais um dia de trabalho? 
                                                            Assim que chegar ao CD, confirme aqui 
                                                            no app.
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View className='mt-10 items-center'>
                                                    <TouchableOpacity className='bg-terciary h-10 w-5/6 items-center justify-center rounded mb-5'
                                                        onPress={handleCancel}
                                                    >
                                                        <Text className='text-lg text-white font-bold'>Confirmar</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity className='bg-secondary h-10 w-5/6 items-center justify-center rounded'
                                                        onPress={handleCancel}
                                                    >
                                                        <Text className='text-lg text-white font-bold'>Cancelar carregamento</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </> 
                                            :
                                            <>
                                                <View className='mt-8 flex-row items-center'>
                                                    <Text className={`text-xl font-bold mr-5 ${ status == 'pending'  ? 'text-yellow-600' : status == 'cancel'  ? 'text-red-600' : 'text-green-600'}`}>
                                                        {dateWork}
                                                    </Text>
                                                    { status == 'pending'  ?
                                                            <Feather name="clock" size={24} color="#ca8a04" />
                                                        :
                                                        status == 'cancel' ?
                                                            <Feather name="x-circle" size={24} color="#dc2626" />
                                                        :
                                                            <Feather name="check-circle" size={24} color={`#16a34a`} />
                                                    }
                                                </View>
                                                <View className='mt-5 px-3'>
                                                    <View className='flex-row'>
                                                        <MaterialCommunityIcons name="steering" size={24} color="black"/>
                                                        <Text className='ml-2 text-base font-light'>{driver}</Text>
                                                    </View>
                                                    { vehicle != 'util' && 
                                                        <View className='mt-3 flex-row'>
                                                            <FontAwesome6 name="handshake-angle" size={19} color="black" />
                                                            <Text className='ml-2 text-base font-light'> {auxiliary} </Text>
                                                        </View>
                                                    }
                                                </View>
                                                <View className='mt-8 items-center'>
                                                    { status == 'pending'  ?
                                                        <Text className='font-light text-2xl'>
                                                            Disponibilidade confirmada para amanhã !
                                                        </Text>
                                                        :
                                                        status == 'cancel' ?
                                                        <Text className='font-light text-2xl'>
                                                            Infelizmente, você não tem carga para amanhã. Em caso de dúvidas, 
                                                            entre em contato com o suporte
                                                        </Text>
                                                        :
                                                        <Text className='font-light text-2xl w-5/6'>
                                                            Carga confirmada para amanhã. Você deve estar no CD às 5:30 e, 
                                                            ao chegar, confirmar no aplicativo.
                                                        </Text>
                                                    }
                                                </View>
                                                { status == 'cancel' ?
                                                    <View className='mt-10 items-center'>
                                                        <TouchableOpacity className='bg-terciary h-10 w-1/2 items-center justify-center rounded'
                                                            onPress={handleHelp}
                                                        >
                                                            <Text className='text-lg text-white font-bold'>Suporte</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    <View className='mt-10 items-center'>
                                                        <TouchableOpacity className='bg-secondary h-10 px-6 items-center justify-center rounded'
                                                            onPress={handleCancel}
                                                        >
                                                            <Text className='text-lg text-white font-bold'>Cancelar carregamento</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                            </>
                                        }
                                    </>
                                    :
                                    <>
                                        { timeExpired ?
                                            <>
                                                <View className='items-center mt-5'>
                                                    <Text className='font-light text-lg'>
                                                        Confirmação disponível apenas das 12:00 às 16:30.
                                                    </Text>
                                                </View>   
                                            </>
                                            :
                                            <>
                                                <View className='mt-5'>
                                                    <Text className='font-light text-lg '>
                                                        Revise as informações e confirme a disponibilidade para carregar amanhã.
                                                    </Text>
                                                    <Text className='text-xl font-bold mt-5'>{dateWork}</Text>
                                                </View>
                                                <View className='mt-5 px-3'>
                                                    <View className='flex-row'>
                                                        <MaterialCommunityIcons name="steering" size={24} color="black"/>
                                                    <Text className='ml-2 text-base font-light'>{driver}</Text>
                                                    </View>
                                                    { vehicle != 'util' && 
                                                        <View className='mt-3 flex-row'>
                                                            <FontAwesome6 name="handshake-angle" size={19} color="black" />
                                                            <Text className='ml-2 text-base font-light'> {auxiliary} </Text>
                                                        </View>
                                                    }
                                                </View>
                                                <View className='mt-8 flex-row items-center'>
                                                    <MaterialCommunityIcons name="information-outline" size={20} color="#ca8a04" />
                                                    <Text className='ml-2 text-yellow-600 font-semibold'>
                                                        Se houver alguma informção incorreta, entre em contato 
                                                        com suporte para atualizá-lo.
                                                    </Text>
                                                </View>
                                                <View className='mt-10'>
                                                    <View className='items-center w-full'>
                                                        <TouchableOpacity className='bg-terciary w-5/6 h-8 rounded items-center justify-center'
                                                            onPress={()=>handleSubmitConfirm()}
                                                        > 
                                                            <Text className='text-lg text-white font-bold'>Confirmar</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View className='items-center w-full mt-3'>
                                                        <TouchableOpacity className='bg-secondary w-5/6 h-8 rounded items-center justify-center'
                                                            onPress={handleHelp}
                                                        > 
                                                            <Text className='text-lg text-white font-bold'>Suporte</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </>
                                        }
                                    </> 
                                }
                            </>
                        }
                        <View className='items-center flex-row justify-center mt-14'>
                            <Image
                                source={MixLogo}
                                className='h-5 w-6 mr-2'
                            />
                            <Text className="text-primary font-bold text-xs">Mix Serviços Logístico</Text>
                        </View>
                    </ScrollView>
                </>
            :
                <Wating/>
            }
        </>
    )
}