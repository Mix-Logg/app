import { FontAwesome6 } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';
import Logo from '../../img/logo/logoAsa.png'
import Mask from '../../hooks/mask';
import { useEffect, useState } from 'react';
export default function SuccessFullPix({amount, tax, taxPix, taxFull, pix, id, create_at}){
    const [date, setDate] = useState('')
    
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

    useEffect(()=>{
        setDate(formatDate(create_at))
    },[])

    return(
        <View>
            <View className='flex flex-row'>
                        <View className='w-7 h-7 mr-3'>
                            <Image
                                source={Logo}
                                resizeMode='contain'
                                className='w-full h-full'
                            />
                        </View>
            </View>
            <View className='flex justify-center items-center'>
                <FontAwesome6 name="circle-check" size={65} color="#FF5F00" />
                <View className='mt-8 flex items-center justify-center'>
                    <Text className='font-bold text-base'>Operação #{id}</Text>
                    <Text className='font-bold text-base'>concluída com sucesso</Text>
                </View> 
                <View className='bg-neutral-100 flex flex-row rounded-lg mt-5 py-3 w-full items-center justify-center'>
                    <FontAwesome6 name="pix" size={18} color="#FF5F00" />
                    <Text className='ml-2 font-semibold'>{pix}</Text>
                </View>
                <View className='items-center justify-center mt-5'>
                    <Text className='text-xs font-semibold text-secondary'>Valor líquido</Text>
                    <Text className='text-4xl mt-1 font-bold'>{Mask('amount', amount - taxFull)}</Text>
                </View>
                <View className='border-t border-b border-secondary flex flex-row justify-evenly py-4 mt-8'>
                    <View className='w-1/2 items-center justify-center'>
                        <Text className='text-xs text-secondary font-semibold'>Valor bruto</Text>
                        <Text className="font-bold text-lg">{Mask('amount',amount)}</Text>
                    </View>
                    <View className='w-1/2 items-center justify-center'>
                        <Text className='text-xs text-secondary font-semibold'>Taxa total</Text>
                        <Text className="font-bold text-lg">{Mask('amount',taxFull)}</Text>
                    </View>
                </View>
                <View className=' border-b border-secondary flex flex-row justify-evenly py-4 '>
                    <View className='w-1/2 items-center justify-center'>
                        <Text className='text-xs text-secondary font-semibold'>Taxa Adiantamento</Text>
                        <Text className="font-bold text-lg">
                            { tax != null ? 
                            Mask('amount',amount / tax)
                            :
                            Mask('amount', 0)
                            }
                        </Text>
                    </View>
                    <View className='w-1/2 items-center justify-center'>
                        <Text className='text-xs text-secondary font-semibold'>Taxa pix</Text>
                        <Text className="font-bold text-lg">{Mask('amount',taxPix)}</Text>
                    </View>
                </View>
                <View className='items-center justify-center mt-5'>
                    <Text className='text-xs text-secondary font-semibold'>Operação realizada em</Text>
                    <Text className="font-bold text-lg">{date}</Text>
                </View>
                <Text className="mt-7 text-primary font-bold text-xs">Mix Serviços Logístico</Text>
            </View>
        </View>
    )
}