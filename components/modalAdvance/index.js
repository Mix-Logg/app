import { useEffect, useState } from "react";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import ToastManager, { Toast } from 'toastify-react-native'
import MaskInput,{ Masks } from 'react-native-mask-input';
import RNPickerSelect from 'react-native-picker-select';
import Mask from "../../hooks/mask";
import findUser from "../../hooks/findUser";
import ModalBottom from "../modalBottom";
import RetrievePayment from "../../hooks/retrievePayment";
import CreatePaymentDelivery from "../../hooks/createPaymentDelivery";
import SuccessFullPix from "../successPix";
import FindUser from "../../hooks/findUser";
import UpdateUser from "../../hooks/updateUser";
import Toastify from "../toastify";
export default function ModalAdvance(){
    const [showTreatment, setShowTreatment] = useState(false)
    const [infoTreatment, setInfoTreatment] = useState('')
    const [key, setKey] = useState('')
    const [create_at, setCreate_at] = useState('')
    const [idTransaction, setIdTransaction] = useState('')
    const [loader, setLoader] = useState(false)
    const [tax, setTax] = useState(0)
    const [taxPix, setTaxPix] = useState(0)
    const [taxFull, setTaxFull] = useState(0)
    const [mask, setMask] = useState('')
    const [info, setInfo] = useState(false)
    const [type, setType] = useState('')
    const [amount, setAmount] = useState(0)
    const [success, setSuccess] = useState(false)
    const [amountMask, setAmountMask] = useState(0)
    const [warningKey, SetWarningKey] = useState(false)
    const [warningType, setWarningType] = useState(false)
    const [warningValue, setWarningValue] = useState(false)
    const [amountRetrive, setAmountRetrive] = useState(0)
    const [amountRetriveMask, setAmountRetriveMask] = useState(Mask('amount',amountRetrive))
    const [availableQuantity, setAvailableQuantity] = useState(false)

    const handleRetrieve = async () => {
        try{
            setLoader(true)
            if(availableQuantity){
                return
            }
            if(amountRetrive < 1500){
                setWarningValue(true)
                setTimeout(() => {
                    setWarningValue(false)
                }, 3000);
                return 
            }
            if(type == ''){
                setWarningType(true)
                setTimeout(() => {
                    setWarningType(false)
                }, 3000);
                return 
            }
            if(key == ''){
                SetWarningKey(true)
                setTimeout(() => {
                    SetWarningKey(false)
                }, 3000);
                return 
            }
            const params_advance = {
              value: amountRetrive - tax,
              key : key,
              type: type
            }
            const response = await RetrievePayment(params_advance);
            console.log(response)
            if(true){
                const user = await FindUser();
                const params_paymentDelivery = {
                    id_user : user.id,
                    taxFull : taxFull,
                    taxPix  : taxPix,
                    tax     : tax,
                    pix     : key,
                    type    : type,
                    amount_out: amountRetrive
                }
                const response = await CreatePaymentDelivery(params_paymentDelivery);
                if(response.status == 201){
                    console.log(response)
                    setIdTransaction(response.id)
                    setCreate_at(response.create)
                    const params_updateUser = {
                        amount: parseInt(amount) - parseInt(amountRetrive)
                    }
                    const update = await UpdateUser(user.id, params_updateUser)
                    if(update == 200){
                        setSuccess(true)
                    }
                    return;
                }
                setInfoError(true)
            }
            setShowTreatment(true)
            setInfoTreatment('Algo deu errado, confirme seus dados .')
        }catch(error){
            setShowTreatment(true)
            setInfoTreatment('Algo deu errado, tente mais tarde.')
        }finally{
            setLoader(false)
        }
    }

    useEffect(()=>{
        const fetchData = async () => {
            const user = await findUser();
            setAmountMask(Mask('amount',user.amount))
            setAmount(user.amount)
            setTaxPix(250)
            setTax(10)
        }
        fetchData()
    },[])
    useEffect(()=>{
        const fetchData = async () => {
            setAmountRetriveMask( Mask('amount', amountRetrive) )
            setTaxFull(0)
            if(amountRetrive >= 1500){
                setTaxFull((amountRetrive / tax) + taxPix)
            }
            switch( parseInt(amountRetrive) > parseInt(amount) ) {
                case true:
                    setAvailableQuantity(true)
                    break;
                case false:
                    setAvailableQuantity(false)
                    break;
                default:
                    break;
            }
        }
        fetchData()
    },[amountRetrive])
    useEffect(()=>{
        const fetchData = async () => { 
            setKey('')
            switch (type) {
                case 'email':
                    setMask('')
                    break;
                case 'random':
                    setMask('')
                    break;
                case 'mobilePhone':
                    setMask(Masks.BRL_PHONE)
                    break;
                case 'cpf':
                    setMask(Masks.BRL_CPF)
                    break;
                case 'cnpj':
                    setMask(Masks.BRL_CNPJ)
                    break;
                default:
                    break;
            }
        }
        fetchData()
    },[type])

    return(
        <>
            <ModalBottom >
                <ScrollView>
                    {!success?
                        <>
                            <Toastify setIsVisible={setShowTreatment} isVisible={showTreatment} option={'danger'} info={infoTreatment} />
                            <View className="flex w-full justify-center items-center gap-2">
                                <Text className="font-bold text-xs text-primary">
                                    Dísponivel para saque <FontAwesome6 name="arrow-trend-up" size={12} />
                                </Text>
                                <Text className="text-4xl font-bold text-primary">
                                    {amountMask}
                                </Text>
                            </View>
                            <View className='mt-8 items-center justify-center w-full px-5'>
                                <View className='w-full flex'>
                                    <Text className='text-sm font-semibold'>Valor</Text>
                                    <TextInput 
                                        className='border border-neutral-300 rounded-lg h-12 mt-2 px-4 text-lg'
                                        keyboardType="numeric"
                                        value={amountRetriveMask}
                                        onChangeText={(value)=> {
                                            setAmountRetrive( Mask('remove',value ) )
                                        }}
                                    >
                                    </TextInput>
                                    { warningValue &&
                                        <View className='flex flex-row items-center'>
                                        <AntDesign name="warning" size={13} color="#ef4444" />
                                        <Text className='font-medium text-red-500 ml-1'> 
                                            Valor de regaste mínimo de R$ 15,00
                                        </Text>
                                        </View>
                                    }
                                    { availableQuantity &&
                                        <View className='flex flex-row items-center'>
                                        <AntDesign name="warning" size={13} color="#ef4444" />
                                        <Text className='font-medium text-red-500 ml-1'> 
                                            Valor dísponivel {amountMask}
                                        </Text>
                                        </View>
                                    }
                                </View>
                                <View className='w-full flex mt-5'>
                                    <Text className='text-sm font-semibold'>Tipo</Text>
                                    <View className='border border-neutral-300 rounded-lg h-12 mt-2 flex items-center justify-center'>
                                        <RNPickerSelect
                                            onValueChange={(value) => setType(value)}
                                            placeholder={{
                                                label: "Tipo da chave pix"
                                            }}
                                            items={[
                                                { label: "E-mail",          value: "email" },
                                                { label: "Chave aleatória", value: "random" },
                                                { label: "Celular",         value: "mobilePhone" },
                                                { label: "CPF",             value: "cpf" },
                                                { label: "CNPJ",            value: "cnpj" },
                                            ]}
                                        />
                                    </View>
                                    { warningType &&
                                        <View className='flex flex-row items-center'>
                                        <AntDesign name="warning" size={13} color="#ef4444" />
                                        <Text className='font-medium text-red-500 ml-1'> 
                                            Selecione o tipo da chave
                                        </Text>
                                        </View>
                                    }
                                </View>
                                <View className='w-full flex mt-5'>
                                    <Text className='text-sm font-semibold'>Chave</Text>
                                    <MaskInput 
                                        mask={mask}
                                        placeholder=""
                                        className='border border-neutral-300 bg-white rounded-lg h-12 mt-2 px-4 text-lg'
                                        keyboardType={type == 'mobilePhone' || type == 'cpf' || type == 'cnpj' ? 'numeric' : 'default' }
                                        value={key}
                                        onChangeText={ (masked, unmasked) => {
                                            setKey(unmasked)
                                        }}
                                    >
                                    </MaskInput>
                                    { warningKey &&
                                        <View className='flex flex-row items-center'>
                                            <AntDesign name="warning" size={13} color="#ef4444" />
                                            <Text className='font-medium text-red-500 ml-1'> 
                                                Digite sua chave pix
                                            </Text>
                                        </View>
                                    }
                                </View>        
                                <View className='flex justify-start items-start w-full mt-5'>
                                    { info &&
                                        <View className='z-10 absolute h-12 w-36 bg-white left-16 rounded-lg shadow shadow-black'>
                                            <Text className=' p-2 text-justify text-xs font-light'>
                                                Taxa MIX de recebimento antecipado
                                            </Text>
                                        </View>
                                    }
                                    <View className='flex flex-row items-center'>
                                        <Text className='text-sm font-semibold'>Total</Text>
                                        <TouchableOpacity className='w-4 h-4 rounded-full bg-primary items-center justify-center ml-2'
                                            onPress={()=>setInfo(!info)}
                                        >
                                            <MaterialCommunityIcons name="information-variant" size={12} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                    <View className='w-full rounded-lg border border-neutral-300 p-3 px-6 mt-2'>
                                            <View className=''>
                                                <Text className='text-2xl font-semibold'>
                                                    {amountRetriveMask}
                                                </Text>
                                                <Text className='text-base flex text-end text-red-600 font-semibold'>
                                                    - {Mask('amount',taxFull)} 
                                                </Text>
                                                <Text className='text-2xl mt-2 font-bold text-primary'>
                                                    {Mask('amount',amountRetrive - taxFull)}
                                                </Text>
                                            </View>
                                    </View>
                                </View>
                                <View className='w-full flex mt-5'>
                                    <TouchableOpacity className={`bg-primary h-10 items-center flex justify-center rounded-lg ${(loader || availableQuantity) && 'opacity-70'}`}
                                        onPress={handleRetrieve}
                                    >
                                        { loader ?
                                            <ActivityIndicator
                                                size={25}
                                                color={'white'}
                                            />
                                            :
                                            <Text className='text-lg text-white font-bold'>
                                                Resgatar
                                            </Text>
                                        }
                                    </TouchableOpacity>  
                                </View>
                            </View>
                        </>
                    :
                        <>
                            <SuccessFullPix create_at={create_at} amount={amountRetrive} tax={tax} taxPix={taxPix} taxFull={taxFull} pix={key} id={idTransaction} />
                        </>
                    }
                </ScrollView>
            </ModalBottom>
        </>
    )
}