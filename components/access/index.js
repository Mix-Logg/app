import twrnc from "twrnc";
import { View, ScrollView, Text, Image,TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Reload from '../../img/icons/Reload.png'
import Wallet from '../../img/icons/Wallet.png'
import Race from '../../img/icons/box.png'

export default function Access({navigation}) {

    const handleAllAcess = (route) => {
        switch (route) {
            case 'all':
                navigation.navigate('AllAccess')
                break;
            case 'wallet':
                navigation.navigate('Wallet')
                break;
            case 'history':
                navigation.navigate('History')
                break;
            case 'race':
                navigation.navigate('Race')
                break;
            default:
                break;
        }
    }

  return (
    <View style={twrnc`w-full h-40 p-2 gap-2 mt-5`}>
        <View style={twrnc`px-3  w-full flex-row justify-between items-center`}>
            <Text style={twrnc`font-bold text-[#374151]`}>Meus acessos</Text>
            <TouchableOpacity style={twrnc`flex-row justify-center items-center gap-2 `}
                onPress={()=>handleAllAcess('all')}
            >
                <Text style={twrnc`text-[#374151]`}>Ver todos</Text>
                <AntDesign name="arrowright" size={15} color="black" />
            </TouchableOpacity>
        </View>
        <ScrollView horizontal>
            <View style={twrnc`flex-row `}>
                <View style={twrnc`items-center justify-center px-5 gap-1`}>
                    <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl`}
                        onPress={()=>handleAllAcess('wallet')}
                    >
                        <Image 
                            source={Wallet}
                            style={twrnc`h-8 w-8`}
                        />
                    </TouchableOpacity>
                    <Text style={twrnc`text-[#7B7B7B]`}>Carteira </Text>
                </View>
                <View style={twrnc`items-center justify-center px-5 gap-1`}>
                    <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl `}
                        onPress={()=>handleAllAcess('history')}
                    >
                        <Image 
                            source={Reload}
                            style={twrnc`h-7 w-7`}
                        />
                    </TouchableOpacity>
                    <Text style={twrnc`text-[#7B7B7B]`} >Histórico </Text>
                </View>
                <View style={twrnc`items-center justify-center px-5 gap-1`}>
                    <TouchableOpacity style={twrnc`border border-[#d4d4d4] justify-center items-center px-2 h-15 w-15 rounded-xl `}
                        onPress={()=>handleAllAcess('race')}
                    >
                        <Image 
                            source={Race}
                            style={twrnc`h-8 w-8`}
                        />
                    </TouchableOpacity>
                    <Text style={twrnc`text-[#7B7B7B]`} >Fretes </Text>
                </View>
            </View>
        </ScrollView>
    </View>
  );
}
