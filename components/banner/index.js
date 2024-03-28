import { View, Text, ScrollView } from "react-native"
import twrnc from "twrnc"
import CardBanner from "../cardBanner"
import Delivery from '../../img/uniqueIcons/delivery.png'
import Mix from '../../img/uniqueIcons/flyMix.png'
import peoples from '../../img/uniqueIcons/characters.png'
export default function Banner(){
    return(
        <View style={twrnc`w-full h-60 px-5 py-5 bg-white`}>
        <View style={twrnc`flex-row w-full justify-between items-center`}>
          <Text style={twrnc`text-xl font-bold text-[#FF5F00]`}>Sobre a Mixervlog </Text>
        </View>
        <View style={twrnc`justify-center items-center`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={twrnc`w-full py-2 gap-5 rounded-xl `}>
            <CardBanner img={Mix} Title={"Quem Somos"} Link={"https://www.mixservlog.com.br/about-us"}   />
            <CardBanner img={Delivery} Title={"Ser um Entregadores"} Link={"https://www.mixservlog.com.br/delivery"} />
            <CardBanner img={peoples} Title={"Nossos Parceiros"} Link={"https://www.mixservlog.com.br/partners"} />
          </ScrollView>
        </View>
      </View>
    )
}