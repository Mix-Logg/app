import { ScrollView, View,  } from "react-native";
import FixBar from "../../fixBar";
import twrnc from "twrnc";
import CardHistory from "../../cardHistory";
export default function History({navigation}){
    return(
        <>
            <FixBar navigation={navigation} opition={'history'} />
            <ScrollView style={twrnc`bg-white py-5 `}>
                <CardHistory navigation={navigation}/>
                <CardHistory navigation={navigation}/>
                <CardHistory navigation={navigation}/>
                <CardHistory navigation={navigation}/>
                <CardHistory navigation={navigation}/>
            </ScrollView>
        </>
    )
}