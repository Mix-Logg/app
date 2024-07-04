import { View, Text } from "react-native"
import findOneOperationToday from "../../hooks/findOneOperationToday"
import { useEffect, useState } from "react"
import { Feather } from '@expo/vector-icons';
export default function timeLineOperationToday(){
    
    const [available  , setAvailable]   = useState(null)
    const [stepOne    , setStepOne]     = useState(null)
    const [freight    , setFreight]     = useState(null)
    const [stepTwo    , setStepTwo]     = useState(null)
    const [check      , setCheck]       = useState(null)
    const [unavailable, setUnavailable] = useState(null)
    const [today      , setToday]       = useState(null);
    const [dateWork   , setDateWork]    = useState(null);
    const [timeStartExpired, setTimeStartExpired] = useState(false);

    const getTomorrowDate = () => {
        const today    = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (tomorrow.getDay() == 0) {
            return false;
        }
        const currentMinutes = today.getMinutes();
        const currentHour    = today.getHours();
        if((currentHour > 5 || (currentHour === 5 && currentMinutes > 30))){
            setTimeStartExpired(true)
        }
        const dayToday   = String(today.getDate()).padStart(2, '0');
        const monthToday = String(today.getMonth() + 1).padStart(2, '0');
        const yearToday  = today.getFullYear();
        setToday(`${dayToday}/${monthToday}/${yearToday}`)
        const day   = String(tomorrow.getDate()).padStart(2, '0');
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
        const year  = tomorrow.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    useEffect(()=>{
        const fetchData = async () => {
            const dateWork = getTomorrowDate()
            setDateWork(dateWork)
            const operationToday = await findOneOperationToday();
            switch (operationToday.status){
                case 'unavailable':
                    setUnavailable(true)
                    setDateWork(operationToday.date)
                    break;
                case 'pending':
                    setAvailable(true)
                    setStepOne  (true)
                    setFreight  (null)
                    setStepTwo  (null)
                    setCheck    (null)
                    setDateWork(operationToday.date)
                    break;
                case 'cancel':
                    setAvailable(true)
                    setStepOne  (true)
                    setFreight  (false)
                    setStepTwo  (false)
                    setCheck    (false)
                    setDateWork(operationToday.date)
                    break;
                case 'confirm':
                    setDateWork (operationToday.date)
                    setAvailable(true)
                    setStepOne  (true)
                    setFreight  (true)
                    setStepTwo  (true)
                    if(timeStartExpired && operationToday.start == null){
                        setCheck(false)
                        return
                    }
                    if(operationToday.start != null){
                        setCheck(true)
                        return
                    }
                    setCheck    (null)
                    break;
                default:
                    break;
            };
        }
        fetchData()
    },[timeStartExpired])
    
    return(
        <View className='items-center bg-white'>
            <View className='flex-row justify-between w-full px-5 mb-5'>
                <Text className='font-bold text-[#374151]'>Disponibilidade</Text>
                <Text className='font-bold text-[#374151]'>{dateWork}</Text>
            </View>
            {
                <>
                    { unavailable ?
                        <View className='mt-4 items-center'>
                            <Text className='mb-2 text-lg font-light'>
                                Ausência registrada, obrigado por avisar.
                            </Text>
                            <Feather name="check-circle" size={24} color="#22c55e" />
                        </View>
                        :
                        <View className='mt-4 flex-row items-center '>
                                <View className='justify-center items-center'>
                                    { available === null ?
                                        <Feather name="clock" size={24} color="#eab308" />
                                        :
                                        available === true ?
                                            <Feather name="check-circle" size={24} color="#22c55e" />
                                            :
                                            <Feather name="x-circle" size={24} color="#ef4444" />
                                    }
                                    <Text className={`text-xs font-bold ${available === null ?'text-yellow-500' : available === true ? 'text-green-500' : 'text-red-500'}`}>
                                        confirmação
                                    </Text>
                                </View>
                                <View className={`h-1 w-8 ${stepOne === null ?'bg-yellow-500' : stepOne === true ? 'bg-green-500' : 'bg-red-500'} mx-1 rounded-lg`}></View>
                                <View className='justify-center items-center px-2'>
                                    { freight === null ?
                                        <Feather name="clock" size={24} color="#eab308" />
                                        :
                                        freight === true ?
                                            <Feather name="check-circle" size={24} color="#22c55e" />
                                            :
                                            <Feather name="x-circle" size={24} color="#ef4444" />
                                    }
                                    <Text className={`text-xs font-bold ${freight === null ?'text-yellow-500' : freight === true ? 'text-green-500' : 'text-red-500'}`}>
                                        carga
                                    </Text>
                                </View>
                                <View className={`h-1 w-8 ${stepTwo === null ?'bg-yellow-500' : stepTwo === true ? 'bg-green-500' : 'bg-red-500'} mx-1 rounded-lg`}></View>
                                <View className='justify-center items-center'>
                                    { check === null ?
                                        <Feather name="clock" size={24} color="#eab308" />
                                        :
                                        check === true ?
                                            <Feather name="check-circle" size={24} color="#22c55e" />
                                            :
                                            <Feather name="x-circle" size={24} color="#ef4444" />
                                    }
                                    <Text className={`text-xs font-bold ${check === null ?'text-yellow-500' : check === true ? 'text-green-500' : 'text-red-500'}`}>
                                        chegada
                                    </Text>
                                </View>
                        </View>
                    }
                </>
            }
        </View>
    )
}