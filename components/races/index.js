import twrnc from "twrnc";
import CardFastRace from "../cardFastRace";
import { View, ScrollView, Text } from "react-native";
export default function Races({navigation}) {
    
    return (
    <View style={twrnc`w-full h-60 px-5 py-5 bg-white-600`}>
      <View style={twrnc`flex-row w-full justify-between items-center`}>
        <Text style={twrnc`font-bold text-[#374151]`}>Fretes </Text>
        <Text style={twrnc` text-[#374151]`}>Acesso rápido </Text>
      </View>
      <View style={twrnc`justify-center items-center`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={twrnc`w-full py-2 gap-5 rounded-xl `}>
          <View style={twrnc`gap-3 py-4 flex-row`}>
            <CardFastRace navigation={navigation}/>
            <CardFastRace navigation={navigation}/>
            <CardFastRace navigation={navigation}/>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
