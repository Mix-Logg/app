import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity, Linking, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { MaterialCommunityIcons, AntDesign, Feather, Octicons, FontAwesome  } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import colors from "tailwindcss/colors";
import MixLogo from '../../../../img/logo/logoComplement1.png'
import FindOneTeam from "../../../../hooks/findOneTeam";
import Wating from "../../../wating";
import Toastify from "../../../toastify";
import ValidDistanceCheck from "../../../../function/validDistanceCheck";
import CreateOperationToday from "../../../../hooks/createOperationToday";
import findOneOperationToday from "../../../../hooks/findOneOperationToday";
import CancelOperationToday from "../../../cancelOperationToday";
import DeleteOperationToday from "../../../../hooks/deleteOperationToday";
import UpdateOperationToday from "../../../../hooks/updateOperationToday";
export default function FastShop(){
    const navigation = useNavigation();

    const [unavailable, setUnavailable] = useState(false)
    const [toastCheckDistance, setToastCheckDistance] = useState(false);
    const [toastSuccessFinishUnavailable, setToastSuccessFinishUnavailable] = useState(false);
    const [toastFailFinishUnavailable   , setFailFinishUnavailable] = useState(false);
    const [checkFetch, setCheckFetch] = useState(false);
    const [today, setToday]   = useState('00/00/0000');
    const [hour, setHour]     = useState(null);
    const [dateWork, setDateWork]   = useState('00/00/0000');
    const [auxiliary, setAuxiliary] = useState(null);
    const [idAuxiliary, setIdAuxiliary] = useState(null);
    const [driver, setDriver]       = useState(null);
    const [idDriver, setIdDriver]   = useState(null);
    const [vehicle, setVehicle]     = useState(null);
    const [id, setId]               = useState(null);
    const [idOperationToday, setIdOperationToday] = useState(null);
    const [status, setStatus]     = useState(null);
    const [hasConfirm, setHasConfirm] = useState(null);
    const [hasStart, setHasStart]     = useState(null);
    const [timeExpired, setTimeExpired]   = useState(null);
    const [timeStartExpired, setTimeStartExpired]  = useState(null);
    const [modalCancel, setModalCancel]   = useState(null);
    const [loaderConfirm, setLoaderConfirm]   = useState(null);
    const [loaderCheckIn, setLoaderCheckIn]   = useState(null);
    const [loaderUnavailable, setLoaderUnavailable]   = useState(null);

    const handleHelp = async () => {
        const phoneNumber = '5511978612671';
        const message = `Olá, preciso de ajuda com minha operação #${id}`
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        Linking.openURL(url)
            .catch(err => console.error('Erro ao abrir o WhatsApp:', err));
    };  

    const handleFinishUnavailable = async () => {
        setLoaderUnavailable(true)
        const response = await DeleteOperationToday(idOperationToday);
            if(response.status == 200){
                setHasStart(null)
                setHasConfirm(null)
                setStatus(null)
                setUnavailable(false)
                setToastSuccessFinishUnavailable(true)
                return
            }
            setFailFinishUnavailable(true)
            return
    }

    const handleStart = async () => {
        try{
            if(loaderCheckIn){
                return
            }
            setLoaderCheckIn(true)
            const check = await ValidDistanceCheck(-23.350355027592585, -46.84510531928067, 1000);
            if(check === false){
                setLoaderCheckIn(false)
                setToastCheckDistance(true)
                return
            }
            if(check === true){
                const today = await findOneOperationToday();
                const currentTime =  new Date();
                const currentTimeBrasil = new Date(currentTime.getTime() - (3 * 60 * 60 * 1000));
                const params = {
                    start: currentTimeBrasil.toISOString()
                }
                const response = await UpdateOperationToday(today.id,params);
                if(response.status == 200){
                    setHasStart(true)
                }
                setLoaderCheckIn(false)
            }
        }catch(e){
            console.log(e)
        }
    };

    const handleSubmitConfirm = async () => {
        try{
            setLoaderConfirm(true)
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
                setLoaderConfirm(false)
                return
            }
        }catch(e){
            setLoaderConfirm(false)
        }
    };

    const handleCancel = async (unavailable) => {
        await setModalCancel('')
        setModalCancel(<CancelOperationToday unavailable={unavailable} dateWork={dateWork} driver={driver} auxiliary={auxiliary} idAuxiliary={idAuxiliary} idDriver={idDriver}/>)
    };

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        const currentMinutes = today.getMinutes();
        const currentHour    = today.getHours();
        setHour(currentHour)
        if ( currentHour >= 8  && currentHour <= 14 ) {
            setTimeExpired(false);
        } else {
            setTimeExpired(true);
        }
        if((currentHour > 5 || (currentHour === 5 && currentMinutes > 30))){
            setTimeStartExpired(true)
        }
        tomorrow.setDate(today.getDate() + 1);
        if (tomorrow.getDay() == 0) {
            return false;
        }
        if (tomorrow.getDay() == 1) {
            if ( currentHour >= 8  && currentHour <= 12 ) {
                setTimeExpired(false);
            }else{
                setTimeExpired(true);
            }
        }
        const dayToday   = String(today.getDate()).padStart(2, '0');
        const monthToday = String(today.getMonth() + 1).padStart(2, '0');
        const yearToday  = today.getFullYear();
        setToday(`${dayToday}/${monthToday}/${yearToday}`)
        const day   = String(tomorrow.getDate()).padStart(2, '0');
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
        const year  = tomorrow.getFullYear();
        // setToday(`${day}/${month}/${year}`)
        return `${day}/${month}/${year}`;
    };

    useEffect(()=>{
        const fetchData = async () => {
                const team = await FindOneTeam();
                setIdAuxiliary(team.idAuxiliary)
                setAuxiliary  (team.nameAuxiliary)
                setStatus(null)
                setId(team.id)
                setDriver(team.nameDriver)
                setIdDriver(team.idDriver)
                setVehicle(team.vehicle)
                const date  = getTomorrowDate();
                setDateWork(date)
                const check = await findOneOperationToday()
                if(check.status != 500 ){
                    setIdOperationToday(check.id)
                    if(check.date == date){
                        let team = JSON.parse(check.team)
                        if(check.status == 'unavailable'){
                            setUnavailable(true)
                        }
                        setHasConfirm(true)
                        setHasStart(check.start)
                        setStatus(check.status)
                        setAuxiliary(team.auxiliary)
                        setDriver(team.driver)
                    }
                    let team = JSON.parse(check.team)
                    setDateWork(check.date)
                    setHasConfirm(true)
                    setHasStart(check.start)
                    setStatus(check.status)
                    setAuxiliary(team.auxiliary)
                    setDriver(team.driver)
                    if(today == check.date){
                        if(check.status == 'cancel'){
                                const response = await DeleteOperationToday(check.id);
                                if(response.status == 200){
                                    const operation_param = {
                                        occurrence: 'Cliente sem carga'
                                    }
                                    await UpdateOperationToday(check.id,operation_param)
                                        setHasStart(null)
                                        setHasConfirm(null)
                                        setStatus(null)
                                        setDateWork(date)
                                    return
                                }
                                setHasStart(null)
                                setHasConfirm(null)
                                setStatus(null)
                                setDateWork(date)
                                return
                        }
                        if(check.status == 'pending'){
                                const response = await DeleteOperationToday(check.id);
                                if(response.status == 200){
                                    const operation_param = {
                                        occurrence: 'Cliente sem carga - pendente'
                                    }
                                    await UpdateOperationToday(check.id,operation_param)
                                        setHasStart(null)
                                        setHasConfirm(null)
                                        setStatus(null)
                                        setDateWork(date)
                                    return
                                }
                                setHasStart(null)
                                setHasConfirm(null)
                                setStatus(null)
                                setDateWork(date)
                                return
                        }
                        if(check.status == 'unavailable'){
                                const response = await DeleteOperationToday(check.id);
                                if(response.status == 200){
                                    setHasStart(null)
                                    setHasConfirm(null)
                                    setStatus(null)
                                    setDateWork(date)
                                    return
                                }
                                setHasStart(null)
                                setHasConfirm(null)
                                setStatus(null)
                                setDateWork(date)
                                return
                        }
                        if(check.status == 'confirm'){
                                if(check.start != null && hour >= 8){
                                    const response = await DeleteOperationToday(check.id);
                                    if(response.status == 200){
                                        const operation_param = {
                                            occurrence: 'Motorista carregou'
                                        }
                                        await UpdateOperationToday(check.id, operation_param)
                                        setHasStart(null)
                                        setHasConfirm(null)
                                        setStatus(null)
                                        setDateWork(date)
                                        return
                                    }
                                    setHasStart(null)
                                    setHasConfirm(null)
                                    setStatus(null)
                                    setDateWork(date)
                                    return
                                }
                                if(hour >= 8){
                                    const response = await DeleteOperationToday(check.id);
                                    if(response.status == 200){
                                        const operation_param = {
                                            occurrence: 'Motorista atrasou'
                                        }
                                        await UpdateOperationToday(check.id, operation_param)
                                        setHasStart(null)
                                        setHasConfirm(null)
                                        setStatus(null)
                                        setDateWork(date)
                                        return
                                    }
                                    return
                                }
                        }
                    }
                }
                setTimeout(() => {
                    setCheckFetch(true)
                }, 3000);
        }
        fetchData()
    },[])

    return(
        <>
            {modalCancel}
            <Toastify isVisible={toastCheckDistance} setIsVisible={setToastCheckDistance}  option={'warning'}  info={'Para confirmar sua chegada, você deve estar pelo menos a 1 km do Centro de Distribuição (CD)'}/>
            <Toastify isVisible={toastSuccessFinishUnavailable} setIsVisible={setToastSuccessFinishUnavailable}  option={'success'}  info={'Ainda bem que mudou de ideia! Agora, você pode confirmar sua disponibilidade.'}/>
            <Toastify isVisible={toastFailFinishUnavailable} setIsVisible={setFailFinishUnavailable}  option={'danger'}   info={'Algo deu errado. Tente novamente mais tarde ou entre em contato com o suporte.'}/>
            { vehicle && driver && dateWork && hour && timeExpired != null && checkFetch ?
                <>
                    <View className='h-20 bg-primary rounded-b-3xl justify-center px-3'>
                        <View className='justify-between flex-row items-center'>
                            <TouchableOpacity className='flex-row items-center'
                                onPress={() => navigation.navigate('Operation')}
                            >
                                <AntDesign name="arrowleft" size={18} color="white" />
                                <Text className='text-white text-lg ml-2'>voltar</Text>
                            </TouchableOpacity>
                            <Image
                                source={MixLogo}
                                className='h-6 w-6 '
                            />
                        </View>
                        <View className='justify-center flex-row gap-2 items-end'>
                            <Text className='font-bold text-white'>Mix Serviços Logísticos</Text>
                        </View>
                    </View>
                    <ScrollView className='p-5'>
                        <View className='w-full my-10'>
                            <Text className='text-2xl font-bold text-primary'> 
                                { today == dateWork && status == 'confirm' ?
                                    'Check-In'
                                    :
                                    'Disponibilidade'
                                }
                            </Text>
                        </View>
                        { !id ?
                            <>
                                <View className='p-5'>
                                    <Text className='text-lg font-light'>
                                        Você ainda não tem uma equipe formada, entre em
                                        contato com o suporte.
                                    </Text>
                                </View>
                            </>
                            :
                            <>
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
                                                        { hasStart ?
                                                            <>
                                                                <View className='mt-5 p-2'>
                                                                    <Text className='text-xl font-bold'>Obrigado!</Text>
                                                                    <Text className='mt-3 font-light text-lg'>
                                                                        Chegada registrada, obrigado pela confirmação. {"\n"}
                                                                        Volte às 8:00 para confirmar a carga de amanhã.
                                                                    </Text>
                                                                </View>
                                                            </>
                                                        :
                                                            <>
                                                                { timeStartExpired ?
                                                                    <>
                                                                        <View className='items-center'>
                                                                            <View className='items-center'>
                                                                                <Text className='text-2xl font-bold text-red-600'>
                                                                                    Você se atrasou!
                                                                                </Text>
                                                                                <Text className='font-light'>
                                                                                    Mas ainda assim você pode marcar o check-in
                                                                                </Text>
                                                                            </View>
                                                                            <View className='mt-10 items-center w-full'>
                                                                                <TouchableOpacity className={`bg-primary h-10 w-5/6 items-center justify-center rounded mb-5 ${ loaderCheckIn && 'opacity-80'}`}
                                                                                    onPress={handleStart}
                                                                                >
                                                                                    { loaderCheckIn ?
                                                                                        <ActivityIndicator
                                                                                            color={'white'}
                                                                                        />
                                                                                        :
                                                                                        <Text className='text-lg text-white font-bold'>
                                                                                            Confirmar
                                                                                        </Text>
                                                                                    }
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity className='bg-secondary h-10 w-5/6 items-center justify-center rounded'
                                                                                    onPress={handleCancel}
                                                                                >
                                                                                    <Text className='text-lg text-white font-bold'>Justificar ausência</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    </>
                                                                :
                                                                    <>
                                                                        <View>
                                                                            <View>
                                                                                <Text className='text-xl font-bold'>Bom dia!</Text>
                                                                                <Text className='text-base font-light'>
                                                                                    Pronto para mais um dia de trabalho? 
                                                                                    Assim que chegar ao CD, confirme aqui 
                                                                                    no app.
                                                                                </Text>
                                                                                <View className='mt-3 p-3 rounded-lg border border-neutral-300 bg-white'>
                                                                                <View className='flex-row'>
                                                                                    <View className='w-8'>
                                                                                            <MaterialCommunityIcons name="steering" size={24} color="#FF5F00"/>
                                                                                    </View>
                                                                                    <Text className='text-base font-light'>{driver}</Text>
                                                                                </View>
                                                                                { idAuxiliary  && 
                                                                                    <View className='mt-3 flex-row'>
                                                                                        <View className='w-8'>
                                                                                            <MaterialCommunityIcons name="handshake-outline" size={24} color="#FF5F00" />
                                                                                        </View>
                                                                                        <Text className='text-base font-light'> {auxiliary} </Text>
                                                                                    </View>
                                                                                }
                                                                                <View className='mt-3 flex-row'>
                                                                                    <View className='w-8'>
                                                                                        <Octicons name="location" size={22} color="#FF5F00" />
                                                                                    </View>
                                                                                    <Text className='text-base font-light'> 
                                                                                        CD - Fast Shop {"\n"} 
                                                                                        Rod Anhanguera Km 37,5 {"\n"} 
                                                                                        Cep: 07789-100 {"\n"}
                                                                                        Bairro: Jordanesia
                                                                                    </Text>
                                                                                </View>
                                                                                </View>
                                                                                <Text className='mt-2 text-lg font-light'>
                                                                                    Confirmação até <Text className='font-bold text-xl'>
                                                                                        5:30
                                                                                    </Text>
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                        <View className='mt-10 items-center'>
                                                                            <TouchableOpacity className={`bg-primary h-10 w-5/6 items-center justify-center rounded mb-5 ${ loaderCheckIn && 'opacity-80'}`}
                                                                                onPress={handleStart}
                                                                            >
                                                                                { loaderCheckIn ?
                                                                                    <ActivityIndicator
                                                                                        color={'white'}
                                                                                    />
                                                                                    :
                                                                                    <Text className='text-lg text-white font-bold'>
                                                                                        Confirmar
                                                                                    </Text>
                                                                                }
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity className='bg-secondary h-10 w-5/6 items-center justify-center rounded'
                                                                                onPress={handleCancel}
                                                                            >
                                                                                <Text className='text-lg text-white font-bold'>Justificar ausência</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </>
                                                                }
                                                            </>
                                                        }
                                                    </> 
                                                    :
                                                    <>
                                                        {  unavailable ?
                                                            <>
                                                                <View>
                                                                    <Text className='text-lg font-light'>
                                                                    Verificamos que você não estará disponível para amanhã. {"\n"}
                                                                    Caso mude de ideia, clique em confirmar.
                                                                    </Text>
                                                                </View>
                                                                <View className='mt-10 w-full'>
                                                                        <View className='items-center w-full'>
                                                                            <TouchableOpacity className={`bg-primary w-5/6 h-8 rounded items-center justify-center ${loaderUnavailable && 'opacity-70'}`}
                                                                                onPress={()=>handleFinishUnavailable()}
                                                                            > 
                                                                                {  loaderUnavailable ?
                                                                                    <ActivityIndicator
                                                                                        color={'white'}
                                                                                    />
                                                                                    :
                                                                                    <Text className={`text-lg text-white font-bold `}>
                                                                                        Confirmar
                                                                                    </Text>
                                                                                }
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                </View>
                                                            </>
                                                            :
                                                            <>
                                                                <View className='flex-row items-center'>
                                                                    <View className='mr-2'>
                                                                        {   status == 'pending'  ?
                                                                                <Feather name="clock" size={22} color="#ca8a04" />
                                                                            :
                                                                            status == 'cancel' ?
                                                                                <Feather name="x-circle" size={22} color="#dc2626" />
                                                                            :
                                                                                <Feather name="check-circle" size={22} color={`#16a34a`} />
                                                                        }
                                                                    </View>
                                                                    <Text className={`text-lg font-bold mr-5 ${ status == 'pending'  ? 'text-yellow-600' : status == 'cancel'  ? 'text-red-600' : 'text-green-600'}`}>
                                                                        {dateWork}
                                                                    </Text>
                                                                </View>
                                                                <View className='mt-3 p-3 rounded-lg border border-neutral-300 bg-white'>
                                                                    <View className='flex-row'>
                                                                        <View className='w-8'>
                                                                                <MaterialCommunityIcons name="steering" size={24} color="#FF5F00"/>
                                                                        </View>
                                                                        <Text className='text-base font-light'>{driver}</Text>
                                                                    </View>
                                                                    { vehicle != 'util' && 
                                                                        <View className='mt-3 flex-row'>
                                                                            <View className='w-8'>
                                                                                <MaterialCommunityIcons name="handshake-outline" size={24} color="#FF5F00" />
                                                                            </View>
                                                                            <Text className='text-base font-light'> {auxiliary} </Text>
                                                                        </View>
                                                                    }
                                                                    <View className='mt-3 flex-row'>
                                                                        <View className='w-8'>
                                                                            <Octicons name="location" size={22} color="#FF5F00" />
                                                                        </View>
                                                                        <Text className='text-base font-light'> 
                                                                            CD - Fast Shop {"\n"} 
                                                                            Rod Anhanguera Km 37,5 {"\n"} 
                                                                            Cep: 07789-100 {"\n"}
                                                                            Bairro: Jordanesia
                                                                        </Text>
                                                                    </View>
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
                                                                            Carga confirmada para amanhã. Você deve estar no CD às 5:00 e, 
                                                                            ao chegar, confirmar no aplicativo.
                                                                        </Text>
                                                                    }
                                                                </View>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </>
                                            :
                                            <>
                                                { timeExpired ?
                                                    <>
                                                        <View className='mt-5'>
                                                            <Text className='text-xl font-bold'>
                                                                Confirmação disponível:
                                                            </Text>
                                                            <Text className='mt-7 text-lg font-light'>
                                                                Segunda a sábado: 8:00 às 14:00
                                                                {"\n"}
                                                                Domingos das <Text>8:00 a 12:00</Text>
                                                            </Text>
                                                        </View>   
                                                    </>
                                                    :
                                                    <>
                                                        <View className='flex-row'>
                                                            <View className='ml-1 w-8 justify-center'>
                                                                <FontAwesome name="calendar" size={20} color="#FF5F00" />
                                                            </View>
                                                            <Text className='font-bold text-lg text-primary'>
                                                                {dateWork}
                                                            </Text>
                                                        </View>
                                                        <View className='mt-3 p-3 rounded-lg border border-neutral-300 bg-white'>
                                                            <View className='flex-row'>
                                                                <View className='w-8'>
                                                                        <MaterialCommunityIcons name="steering" size={24} color="#FF5F00"/>
                                                                </View>
                                                                <Text className='text-base font-light'>{driver}</Text>
                                                            </View>
                                                            { vehicle != 'util' && 
                                                                <View className='mt-3 flex-row'>
                                                                    <View className='w-8'>
                                                                        <MaterialCommunityIcons name="handshake-outline" size={24} color="#FF5F00" />
                                                                    </View>
                                                                    <Text className='text-base font-light'> {auxiliary} </Text>
                                                                </View>
                                                            }
                                                            <View className='mt-3 flex-row'>
                                                                <View className='w-8'>
                                                                    <Octicons name="location" size={22} color="#FF5F00" />
                                                                </View>
                                                                <Text className='text-base font-light'> 
                                                                    CD - Fast Shop {"\n"} 
                                                                    Rod Anhanguera Km 37,5 {"\n"} 
                                                                    Cep: 07789-100 {"\n"}
                                                                    Bairro: Jordanesia
                                                                </Text>
                                                            </View>
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
                                                                <TouchableOpacity className={`bg-primary w-5/6 h-8 rounded items-center justify-center ${loaderConfirm && 'opacity-70'}`}
                                                                    onPress={()=>handleSubmitConfirm()}
                                                                > 
                                                                    {  loaderConfirm ?
                                                                        <ActivityIndicator
                                                                            color={'white'}
                                                                        />
                                                                        :
                                                                        <Text className={`text-lg text-white font-bold `}>
                                                                            Confirmar
                                                                        </Text>
                                                                    }
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View className='items-center w-full mt-5'>
                                                                <TouchableOpacity className={`bg-secondary w-5/6 h-8 rounded items-center justify-center ${loaderConfirm && 'opacity-70'}`}
                                                                    onPress={()=>handleCancel(true)}
                                                                > 
                                                                    <Text className={`text-lg text-white font-bold `}>
                                                                        Indisponível
                                                                    </Text>
                                                                    
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </>
                                                }
                                            </> 
                                        }
                                    </>
                                }
                            </>
                        }
                        <View className='mt-10 items-center'>
                            <TouchableOpacity className=' h-10 w-1/2 items-center justify-center rounded flex-row '
                                onPress={handleHelp}
                            >
                            <MaterialCommunityIcons
                                name="headset"
                                size={24}
                                color={colors.neutral[500]}
                            />
                                <Text className='text-lg text-neutral-500 font-bold ml-2'>Suporte</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </>
            :
                <Wating/>
            }
        </>
    )
}