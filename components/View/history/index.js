import { ScrollView, View,  } from "react-native";
import FixBar from "../../fixBar";
import twrnc from "twrnc";

export default function History({navigation}){
    return(
        <>
            <FixBar navigation={navigation} opition={'history'} />
            <ScrollView style={twrnc`bg-white`}>

            </ScrollView>
        </>
    )
}