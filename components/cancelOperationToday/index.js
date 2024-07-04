import { View, Text, TextInput ,TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import ModalBottom from "../modalBottom";
import { useState } from "react";
import LogoMix from '../../img/logo/logoAsa.png'
import FindOneOperationToday from "../../hooks/findOneOperationToday";
import UpdateOperationToday from "../../hooks/updateOperationToday";
import DeleteOperationToday from "../../hooks/deleteOperationToday";
import CreateOperationToday from "../../hooks/createOperationToday";
import Toastify from "../toastify";
import { useNavigation } from "@react-navigation/native";
export default function CancelOperationToday({unavailable, driver, auxiliary, idAuxiliary, idDriver, dateWork}){
    const navigation = useNavigation()

    const [showSuccess, setShowSuccess] = useState(false)
    const [showDanger,  setShowDanger] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const [loader, setLoader] = useState(false)
    const [occurrence, setOccurrence] = useState('')
    const [txtOccurrence, setTxtOccurrence] = useState('')

    const handleConfirmCancel = async () => {
        setLoader(true)
        if( occurrence =='other' && txtOccurrence.length < 3 || occurrence == ''){
            setShowWarning(true)
            setLoader(false)
            return
        }
        if(unavailable){
            const paramsConfirm = {
                date       :dateWork,
                team       :JSON.stringify({
                                driver   :driver,
                                auxiliary:auxiliary
                            }),
                operation  :'Fast-Shop',
                idAuxiliary:idAuxiliary,
                idDriver   :idDriver,
                status     :'unavailable',
                occurrence: occurrence == 'other' ? txtOccurrence : occurrence
            };
            const response = await CreateOperationToday(paramsConfirm);
            if(response.status == 201){
                setLoader(false)
                navigation.navigate('Home')
                return
            }
            setShowDanger(true)
            return
        }
        const operation = await FindOneOperationToday();
        const operation_param = {
            occurrence: occurrence == 'other' ? txtOccurrence : occurrence
        }
        const response = await DeleteOperationToday(operation.id);
        if(response.status == 200){
            await UpdateOperationToday (operation.id, operation_param)
            setShowSuccess(true)
            setLoader(false)
            navigation.navigate('Home')
            return
        }
        setShowDanger(true)
        setLoader(false)
        return
    }

   
    return(
        <ModalBottom>
            <Toastify isVisible={showSuccess} setIsVisible={setShowSuccess} option={'success'} info={'Carregamento cancelado'}/>
            <Toastify isVisible={showDanger}  setIsVisible={setShowDanger}  option={'danger'}  info={'Algo deu errado, tente mais tarde.'}/>
            <Toastify isVisible={showWarning} setIsVisible={setShowWarning} option={'warning'} info={'Selecione uma opção ou digite!'}/>
            <View>
                <View className='mb-10'>
                    <View className='h-20 w-20'>
                        <Image
                            source={LogoMix}
                            className='h-full w-full'
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View className={``}>
                    <Text className='text-sm font-semibold'>
                        Motivo da ausência
                    </Text>
                    { occurrence == 'other' ?
                        <TextInput
                            className='border h-12 rounded px-3 text-lg'
                            placeholder="Digite o motivo"
                            value={txtOccurrence}
                            onChangeText={(event)=>setTxtOccurrence(event)}
                        />
                        :
                        <View className='border rounded h-12 items-center justify-center'>
                            <RNPickerSelect
                                onValueChange={(value) => setOccurrence(value)}
                                placeholder={{
                                    label: "Motivo do cancelamento"
                                }}
                                items={[
                                        { label: "Motorista doente",  value: "Motorista doente" },
                                        { label: "Carro quebrou",     value: "Carro quebrou" },
                                        { label: "Auxiliar doente",   value: "Auxiliar doente" },
                                        { label: "Auxiliar faltou",   value: "Auxiliar faltou" },
                                        { label: "Outro",             value: "other" }
                                ]}
                            />
                        </View>
                    }
                </View>
                <View className='mt-8 items-center flex-row'>
                    <Feather name="info" size={18} color="#ca8a04" />
                    <Text className='font-bold text-xs w-5/6 ml-2 text-yellow-600'>
                        Evite cancelar, pois durante a seleção dos veículos para carregamento, 
                        priorizamos aqueles com menos cancelamentos e faltas.
                    </Text>
                </View>
                <View className='items-center mt-12'>
                    <TouchableOpacity className='bg-secondary h-10 w-5/6 rounded items-center justify-center'
                        onPress={handleConfirmCancel}
                    >
                        { loader ?
                            <ActivityIndicator
                                size={20}
                                color={'#FFFFFF'}
                            />
                            :
                            <Text className='text-white text-lg font-bold'>Confirmar ausência</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </ModalBottom>
   ) 
}