import { ScrollView, View, Text, TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import CardHistory from "../../cardHistory";
import FindAllHistory from "../../../hooks/findAllHistoryRace";
import Wating from "../../wating";
import colors from "tailwindcss/colors";
import FindAllHistoryCancel from "../../../hooks/findAllHistoryCancel";
export default function History({navigation}){
    const [cards, setCards] = useState('')
    const [showCancelled, setShowCancelled] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false); 

    const toggleCancelledFilter = () => {
        setShowCancelled(!showCancelled); // Inverte o estado do filtro de canceladas
        setShowCompleted(false); // Desativa o filtro de completadas
    };
    
    const toggleCompletedFilter = () => {
        setShowCompleted(!showCompleted); // Inverte o estado do filtro de completadas
        setShowCancelled(false); // Desativa o filtro de canceladas
    };
    
    useEffect(()=>{
        const fetchData = async ()=> {
            const history       = await FindAllHistory();
            const historyCancel = await FindAllHistoryCancel();
            const cardHistory = history.map(race => (
                <CardHistory 
                    key={race.id}
                    raceId={race.id} 
                    price={race.value} 
                    km={race.km}
                />
            ));
            const cardHistoryCancel = historyCancel.map(race => (
                <CardHistory 
                    key={race.create_at}
                    cancel={true}
                    raceId={race.idRace} 
                    cancelDate={race.create_at} 
                    tax={race.tax}
                />
            ));
            if(showCancelled){
                setCards(cardHistoryCancel)
                return
            }
            if(showCompleted){
                setCards(cardHistory)
                return
            }
            const combinedCards = [...cardHistory, ...cardHistoryCancel];
            setCards(combinedCards);
        }
        fetchData()
    },[showCancelled, showCompleted])


    return(
        <>
            <FixBar navigation={navigation} opition={'history'} />
            {cards ?
                <ScrollView style={twrnc`bg-white py-2 `}>
                    <View className='p-5'>
                        <View className="flex-row items-center mt-1">
                                <MaterialCommunityIcons
                                    name="filter"
                                    size={18}
                                    color={colors.neutral[500]}
                                />
                                <Text className="ml-1 text-base text-neutral-500">Filtros</Text>
                        </View>
                        <View className="flex-row">
                                <TouchableOpacity
                                    className={`mt-3 flex-row items-center py-3  px-3 ${
                                    showCancelled ? "bg-red-100 w-32 border border-red-600/20" : "bg-neutral-200"
                                    } rounded-lg`}
                                    onPress={toggleCancelledFilter}
                                >
                                    <MaterialCommunityIcons
                                    name="close"
                                    size={18}
                                    color={showCancelled ? colors.red[600] : colors.neutral[600]}
                                    />
                                    {showCancelled && (
                                    <Text
                                        className={`ml-2  text-sm ${
                                        showCancelled ? "text-red-600" : "text-neutral-600"
                                        }`}
                                    >
                                        Canceladas
                                    </Text>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`ml-2 mt-3 flex-row items-center py-3  px-3 ${
                                    showCompleted ? "bg-lime-100 w-36 border border-lime-600/20" : "bg-neutral-200"
                                    } rounded-lg`}
                                    onPress={toggleCompletedFilter}
                                >
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={18}
                                        color={showCompleted ? colors.lime[600] : colors.neutral[600]}
                                    />
                                    {showCompleted && (
                                    <Text
                                        className={`ml-2  text-sm ${
                                        showCompleted ? "text-lime-600" : "text-neutral-600"
                                        }`}
                                    >
                                        Finalizadas
                                    </Text>
                                    )}
                                </TouchableOpacity>
                        </View>
                    </View>
                    {cards.length > 0 ?
                        cards
                        :
                        <View style={twrnc`h-50 p-5`}>
                            <Text style={twrnc`text-3xl`}>Não tem historico {'\n'}para mostrar {'\n'}aqui</Text>
                        </View>
                    } 
                </ScrollView>
                : 
                <Wating/>
            } 
        </>
    )
}