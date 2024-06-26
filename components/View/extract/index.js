import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { MaterialIcons, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import FindAllExtract from "../../../hooks/findAllExtract";
import CardExtract from "../../cardExtract";
import FindUser from "../../../hooks/findUser";
import colors from "tailwindcss/colors";
import Wating from "../../wating";
export default function Extract(){
    const navigation = useNavigation()
    const [cards, setCards] = useState('')
    const [showPending, setShowPending] = useState(false);
    const [showPay, setShowPay] = useState(false);
    
    const togglePending = () => {
        setShowPending(!showPending); 
        setShowPay(false); 
    };
    
    const togglePay = () => {
        setShowPay(!showPay); 
        setShowPending(false); 
    };

    const handleBack = () => {
        navigation.navigate('Wallet')
    };

    useEffect(()=>{
        const dataFetch = async () => {
            let allCardExtract = [];
            let payCardExtract = [];
            let pendingCardExtract = [];
            const user = await FindUser();
            const extracts = await FindAllExtract(user.id);
            for (const extract of extracts) {
                if (showPay && extract.status == 'pay') {
                    const card = <CardExtract key={extract.id} status={extract.status} create_at={extract.create_at} amount={extract.amount_out} tax={extract.tax} taxPix={extract.taxPix} taxFull={extract.taxFull} pix={extract.pix} id={extract.id} />;
                    payCardExtract.push(card);
                    continue; 
                }
                if (showPending && extract.status == 'pending') {
                    const card = <CardExtract key={extract.id} status={extract.status} create_at={extract.create_at} amount={extract.amount_out} tax={extract.tax} taxPix={extract.taxPix} taxFull={extract.taxFull} pix={extract.pix} id={extract.id} />;
                    pendingCardExtract.push(card);
                    continue; 
                }
                const card = <CardExtract key={extract.id} status={extract.status} create_at={extract.create_at} amount={extract.amount_out} tax={extract.tax} taxPix={extract.taxPix} taxFull={extract.taxFull} pix={extract.pix} id={extract.id} />;
                allCardExtract.push(card);
            }
            if(showPay){
                setCards(payCardExtract.reverse());
                return
            }
            if(showPending){
                setCards(pendingCardExtract.reverse());
                return
            }
            setCards(allCardExtract.reverse());
        };
        dataFetch(); 
    },[showPay, showPending])

    return(
        <View className="bg-white h-full p-5">
            <View className='w-full flex-row items-center justify-between mb-5'>
                <TouchableOpacity className='bg-primary w-9 h-9 justify-center items-center rounded-lg'
                    onPress={handleBack}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-primary mr-5'>
                    Extrato
                </Text>
            </View>
            <View>
                <View className="flex-row items-center mt-1">
                    <MaterialCommunityIcons
                        name="filter"
                        size={18}
                        color={colors.neutral[500]}
                    />
                    <Text className="ml-1 text-base text-neutral-500">Filtros</Text>
                </View>
                <View className="flex-row mb-8">
                    <TouchableOpacity
                        className={`mt-3 flex-row items-center py-3  px-3 ${
                            showPending ? "bg-yellow-100 w-32 border border-yellow-600/20" : "bg-neutral-200"
                        } rounded-lg`}
                        onPress={togglePending}
                    >
                        <FontAwesome6 
                            name="clock"
                            size={18}
                            color={showPending ? colors.yellow[600] : colors.neutral[600]}
                        />
                        {showPending && (
                        <Text
                            className={`ml-2  text-sm ${
                                showPending ? "text-yellow-600" : "text-neutral-600"
                            }`}
                        >
                            Pendentes
                        </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`ml-2 mt-3 flex-row items-center py-3  px-3 ${
                        showPay ? "bg-lime-100 w-36 border border-lime-600/20" : "bg-neutral-200"
                        } rounded-lg`}
                        onPress={togglePay}
                    >
                        <FontAwesome6
                        name="circle-check"
                        size={18}
                        color={showPay ? colors.lime[600] : colors.neutral[600]}
                        />
                        {showPay && ( 
                        <Text
                            className={`ml-2  text-sm ${
                            showPay ? "text-lime-600" : "text-neutral-600"
                            }`}
                        >
                            Pagos
                        </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                { cards ?
                    cards
                    :
                    <Wating/>
                }
            </ScrollView>
        </View>
    )
}