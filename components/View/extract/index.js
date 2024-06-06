import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import FindAllExtract from "../../../hooks/findAllExtract";
import CardExtract from "../../cardExtract";
import FindUser from "../../../hooks/findUser";
export default function Extract(){
    const navigation = useNavigation()
    const [cards, setCards] = useState('')
    useEffect(()=>{
        const dataFetch = async () => {
            let allCardExtract = []
            const user = await FindUser()
            const extracts = await FindAllExtract(user.id);
            extracts.map( async (extract) => {
                const card = < CardExtract key={extract.id} create_at={extract.create_at} amount={extract.amount_out} tax={extract.tax} taxPix={extract.taxPix} taxFull={extract.taxFull} pix={extract.pix} id={extract.id}/>
                allCardExtract.push(card)
            })
            setCards(allCardExtract.reverse())
        }
        dataFetch()
    },[])

    const handleBack = () => {
        navigation.navigate('Wallet')
    }

    return(
        <View className="bg-white h-full p-5">
            <View className='w-full flex-row items-center justify-between mb-14'>
                <TouchableOpacity className='bg-primary w-9 h-9 justify-center items-center rounded-lg'
                    onPress={handleBack}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-primary mr-5'>
                    Extrato
                </Text>
            </View>
            <ScrollView>
                {cards}
            </ScrollView>
        </View>
    )
}