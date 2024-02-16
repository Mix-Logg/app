import twrnc from 'twrnc';
import { View, Image,Text , Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FixBar from '../../fixBar';
export default function Profile({navigation}){
    const handleLogout = async () => {
        await AsyncStorage.removeItem('access');
        navigation.navigate('Login')
    }

    return(
        <View style={twrnc`flex h-full items-center`}>
            <FixBar navigation={navigation}/>
            <View>
                <View style={twrnc`w-full justify-center items-center`}>
                    <View style={twrnc`rounded-full border h-30 w-30`}>

                    </View>
                    <View>
                        <Text>Sua Foto foi reprovada, clique</Text>
                        <Text>no ícone e mande uma nova</Text>
                    </View>
                </View>
                <View style={twrnc`w-full h-20 bg-black`}>
                    <View style={twrnc`w-full bg-[#EFEFEF]`}>
                        <Text>AQUI</Text>
                    </View>
                    <View style={twrnc`w-2/5 bg-[#EFEFEF] h-10`}>
                        <Text>AQUI</Text>
                    </View>
                </View>
                {/* <Pressable
                onPress={handleLogout}
                >
                    <Text>LOGOUT</Text>
                </Pressable> */}
            </View>
        </View>
    )
}