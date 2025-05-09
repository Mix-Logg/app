import React from 'react';
import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import FindOneOperationToday from "../../hooks/findOneOperationToday"
import DeleteOperationToday from "../../hooks/deleteOperationToday";
import UpdateOperationToday from "../../hooks/updateOperationToday";
export default function timeLineOperationToday({setWait}){
    const navigation = useNavigation()
    const [available  , setAvailable]   = useState(null)
    const [stepOne    , setStepOne]     = useState(null)
    const [freight    , setFreight]     = useState(null)
    const [stepTwo    , setStepTwo]     = useState(null)
    const [check      , setCheck]       = useState(null)
    const [exception  , setException]   = useState(null)
    const [unavailable, setUnavailable] = useState(null)
    const [dateWork   , setDateWork]    = useState(null);
    const [hour       , setHour]        = useState(null);
    const [timeStartExpired, setTimeStartExpired] = useState(false);

    const getTomorrowDate = (where) => {
        const today    = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (tomorrow.getDay() == 0) {
            return false;
        }
        const currentMinutes = today.getMinutes();
        const currentHour    = today.getHours();
        setHour(currentHour)
        if((currentHour > 5 || (currentHour === 5 && currentMinutes > 30))){
            setTimeStartExpired(true)
        }
        const dayToday   = String(today.getDate()).padStart(2, '0');
        const monthToday = String(today.getMonth() + 1).padStart(2, '0');
        const yearToday  = today.getFullYear();
        if(where == 'today'){
            return `${dayToday}/${monthToday}/${yearToday}`
        }
        const day   = String(tomorrow.getDate()).padStart(2, '0');
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
        const year  = tomorrow.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const today = getTomorrowDate('today'); // Data de hoje
            const dateWork = getTomorrowDate(); // Data de amanhã (dia de trabalho)
            let operationToday;
            const currentHour = new Date().getHours(); // Obter a hora atual do sistema
        
            do {
                // Buscar a operação do dia atual ou anterior
                operationToday = await FindOneOperationToday();
                if (!operationToday || !operationToday.date) {
                    break; // Sair do loop se não encontrar operação
                }
        
                // Verificação para dias anteriores ou operação inválida
                if (operationToday.date !== today) {
                    // Lógica de finalização baseada no status da operação
                    switch (operationToday.status) {
                        case 'exception':
                            if (operationToday.date === dateWork) {
                                setException(true);
                                setDateWork(operationToday.date);
                                break;
                            }
                            setDateWork(dateWork);
                            await DeleteOperationToday(operationToday.id);
                            continue;
        
                        case 'cancel':
                            if (operationToday.date === dateWork) {
                                setAvailable(true);
                                setStepOne(true);
                                setFreight(false);
                                setStepTwo(false);
                                setCheck(false);
                                setDateWork(operationToday.date);
                                break;
                            }
                            setDateWork(dateWork);
                            const cancelResponse = await DeleteOperationToday(operationToday.id);
                            if (cancelResponse.status === 200) {
                                const operation_param = { occurrence: 'Cliente sem carga' };
                                await UpdateOperationToday(operationToday.id, operation_param);
                            }
                            continue;
        
                        case 'pending':
                            if (operationToday.date === dateWork) {
                                setAvailable(true);
                                setStepOne(true);
                                setFreight(null);
                                setStepTwo(null);
                                setCheck(null);
                                setDateWork(operationToday.date);
                                break;
                            }
                            setDateWork(dateWork);
                            const pendingResponse = await DeleteOperationToday(operationToday.id);
                            if (pendingResponse.status === 200) {
                                const operation_param = { occurrence: 'Cliente sem carga - pendente' };
                                await UpdateOperationToday(operationToday.id, operation_param);
                            }
                            continue;
        
                        case 'unavailable':
                            if (operationToday.date === dateWork) {
                                setUnavailable(true);
                                setDateWork(operationToday.date);
                                break;
                            }
                            setDateWork(dateWork);
                            await DeleteOperationToday(operationToday.id);
                            continue;
        
                        case 'confirm':
                            if (operationToday.date === dateWork) {
                                setDateWork(operationToday.date);
                                setAvailable(true);
                                setStepOne(true);
                                setFreight(true);
                                setStepTwo(true);
                                break;
                            }
                            setDateWork(dateWork);
                            if (operationToday.start != null && currentHour >= 8) {
                                const confirmResponse = await DeleteOperationToday(operationToday.id);
                                if (confirmResponse.status === 200) {
                                    const operation_param = { occurrence: 'Motorista carregou' };
                                    await UpdateOperationToday(operationToday.id, operation_param);
                                }
                            } else if (currentHour >= 8) {
                                const lateResponse = await DeleteOperationToday(operationToday.id);
                                if (lateResponse.status === 200) {
                                    const operation_param = { occurrence: 'Motorista atrasou' };
                                    await UpdateOperationToday(operationToday.id, operation_param);
                                }
                            }
                            continue;
        
                        default:
                            break;
                    }
                } else if (operationToday.date === today) {
                    // Hoje: Verificar se a hora é maior que 8 para poder finalizar
                    if (currentHour >= 8) {
                        const response = await DeleteOperationToday(operationToday.id);
                        if (response.status === 200) {
                            const operation_param = { occurrence: 'Atraso / Falta' };
                            await UpdateOperationToday(operationToday.id, operation_param);
                        }
                    } else {
                        // Se a hora for menor que 8, não finaliza hoje, continua aguardando
                        break;
                    }
                }
            } while (operationToday && operationToday.date !== dateWork);
        
            setWait(true); // Operação finalizada corretamente
        };
        
    
        fetchData();
    }, [timeStartExpired]);
    

    useFocusEffect(
        React.useCallback(() => {
        const fetchData = async () => {
                const today    = getTomorrowDate('today')
                const dateWork = getTomorrowDate()
                const operationToday = await FindOneOperationToday();
                if(operationToday.status != 500 ){
                    let response

                    switch (operationToday.status) {
                        case 'cancel':
                            if(operationToday.date == dateWork){
                                // 1 dia antes do trabalho 
                                setAvailable(true)
                                setStepOne  (true)
                                setFreight  (false)
                                setStepTwo  (false)
                                setCheck    (false)
                                setDateWork(operationToday.date)
                                return
                                
                            }
                            setDateWork(dateWork)
                            response = await DeleteOperationToday(operationToday.id);
                            if(response.status == 200){
                                const operation_param = {
                                    occurrence: 'Cliente sem carga'
                                }
                                await UpdateOperationToday(operationToday.id, operation_param)
                                return
                            }
                            break;
                        case 'pending':
                            if(operationToday.date == dateWork){
                                // 1 dia antes do trabalho 
                                setAvailable(true)
                                setStepOne  (true)
                                setFreight  (null)
                                setStepTwo  (null)
                                setCheck    (null)
                                setDateWork(operationToday.date)
                                return
                            }
                            setDateWork(dateWork)
                            response = await DeleteOperationToday(operationToday.id);
                            if(response.status == 200){
                                const operation_param = {
                                    occurrence: 'Cliente sem carga - pendente'
                                }
                                await UpdateOperationToday(operationToday.id,operation_param)
                                break
                            }
                            break;
                        case 'unavailable':
                            if(operationToday.date == dateWork){
                                // 1 dia antes do trabalho 
                                setUnavailable(true)
                                setDateWork(operationToday.date)
                                return
                            }
                            setDateWork(dateWork)
                            response = await DeleteOperationToday(operationToday.id);
                            if(response.status == 200){
                                break
                            }
                            break;
                        case 'confirm':
                            if(operationToday.date == dateWork){
                                // 1 dia antes do trabalho 
                                setDateWork (operationToday.date)
                                setAvailable(true)
                                setStepOne  (true)
                                setFreight  (true)
                                setStepTwo  (true)
                                return
                            }
                            setDateWork(dateWork)
                            if(operationToday.start != null && hour >= 8){
                                const response = await DeleteOperationToday(operationToday.id);
                                if(response.status == 200){
                                    const operation_param = {
                                        occurrence: 'Motorista carregou'
                                    }
                                    await UpdateOperationToday(operationToday.id, operation_param)
                                    break
                                }
                                break
                            }
                            if(hour >= 8){
                                const response = await DeleteOperationToday(operationToday.id);
                                if(response.status == 200){
                                    const operation_param = {
                                        occurrence: 'Motorista atrasou'
                                    }
                                    await UpdateOperationToday(operationToday.id, operation_param)
                                    break
                                }
                                break
                            }
                            break;
                        default:
                            break;
                    }
                }
        }
        fetchData();
        }, [navigation])
    );
    
    return(
        <View className='items-center bg-white'>
            <View className='flex-row justify-between w-full px-5 mb-5'>
                <Text className='font-bold text-[#374151]'>Disponibilidade</Text>
                <Text className='font-bold text-[#374151]'>{dateWork}</Text>
            </View>
            {
                <>
                    { unavailable ||  exception ?
                        <View className='mt-4 items-center'>
                            { unavailable ?
                                <Text className='mb-2 text-lg font-light'>
                                    Ausência registrada, obrigado por avisar.
                                </Text>
                                :
                                <Text className='mb-2 text-lg font-light'>
                                    Exceção registrada, obrigado por avisar.
                                </Text>
                            }
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
                                        check-in
                                    </Text>
                                </View>
                        </View>
                    }
                </>
            }
        </View>
    )
}