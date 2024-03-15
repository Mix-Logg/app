import { ScrollView, View,  } from "react-native";
import FixBar from "../../fixBar";
import twrnc from "twrnc";

export default function Race({navigation}){
    return(
        <>
            <FixBar navigation={navigation} opition={'race'} />
            <ScrollView style={twrnc`bg-white`}>

            </ScrollView>
        </>
    )
}