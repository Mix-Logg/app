import { View, Image,Text ,TextInput, Pressable, StatusBar  } from 'react-native';
import Bar from '../../bar';
import twrnc from 'twrnc';
export default function Home ({navigation}){
    return(
        <View style={twrnc`flex h-full bg-[#F4F4F4]`}>
            <StatusBar
                backgroundColor='#F4F4F4'
            /> 
            <Bar navigation={navigation} />
        </View>
    )
}