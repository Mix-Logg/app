import { ScrollView, View, Text } from "react-native";
import FixBar from "../../fixBar";
import { useEffect, useState } from "react";
import twrnc from "twrnc";
import CardHistory from "../../cardHistory";
import FindAllHistory from "../../../hooks/findAllHistoryRace";
import Wating from "../../wating";
export default function History({navigation}){
    const [cards, setCards] = useState('')
    useEffect(()=>{
        const fetchData = async ()=> {
            const history = await FindAllHistory();
            const cardHistory = history.map(race => (
                <CardHistory 
                key={race.id}
                raceId={race.id} 
                price={race.value} 
                km={race.km}
                /> 
            ));
            setCards(cardHistory);
        }
        fetchData()
    },[])


    return(
        <>
            <FixBar navigation={navigation} opition={'history'} />
            {cards ?
                <ScrollView style={twrnc`bg-white py-2 `}>
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