import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native"
import Pix from '../../img/icons/pix.png'
import Mask from '../../hooks/mask';
import { useNavigation } from "@react-navigation/native";
export default function CardExtract({status,amount, tax, taxPix, taxFull, pix, id, create_at}){
    const [ icon, setIcon] = useState('')
    const [ modal, setModal] = useState('')
    const navigation = useNavigation()

    const formatDate = (dataHoraISO) => {
        if(!dataHoraISO){
            return ''
        }
        // Array com os nomes dos meses em português
        const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
      
        // Quebrando a string
        const partes = dataHoraISO.split('T');
        const data = partes[0].split('-');
        const hora = partes[1].split(':');
      
        // Extraindo e formatando as partes
        const ano = data[0];
        const mesIndex = parseInt(data[1]) - 1; // Subtraindo 1 porque os meses em JavaScript são indexados em 0
        const mes = meses[mesIndex];
        const dia = data[2].padStart(2, '0');
        const horas = hora[0].padStart(2, '0');
        const minutos = hora[1].padStart(2, '0');
        const segundos = hora[2];
        const fusoHorario = 'UTC';
      
        // Formatando a data e hora
        const dataFormatada = `${dia}/${data[1]}/${ano} às ${horas}:${minutos}`;
      
        return dataFormatada;
    }

    const handleDetails = async () => {
        const params = {
            status:status,
            create_at:create_at,
            id:id,
            amount:amount,
            tax:tax,
            taxPix:taxPix,
            taxFull:taxFull,
            pix:pix,
        }
        navigation.navigate('ExtractDetails',params)

    }

    useEffect(()=>{
        switch (tax) {
            case null:
                setIcon(
                    <Image
                        source={Pix}
                        className='w-8 h-8'
                        tintColor={'white'}
                    />
                )
            break;
                break;
            default:
                setIcon(<AntDesign name="rocket1" size={30} color="white" />)
            break;
        }
    },[])

    return(
        <TouchableOpacity className="flex-row border-b border-neutral-300 py-5 justify-between"
            onPress={handleDetails}
        >
            <View className='flex-row'>
                <View className='justify-center px-5'>
                    <View className='bg-primary rounded-lg h-14 w-14 items-center justify-center'>
                        {icon}
                    </View>
                </View>
                <View>
                    <Text className='mb-1 font-bold'>Transferência enviada</Text>
                    <Text className='mb-1'>{Mask('amount',amount)}</Text>
                    <Text>{formatDate(create_at)}</Text>
                </View>
            </View>
            <View className='justify-center'>
                <MaterialIcons name="keyboard-arrow-right" size={30} color="#FF5F00" />
            </View>
        </TouchableOpacity>
    )
}