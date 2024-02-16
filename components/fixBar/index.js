import twrnc from 'twrnc';
import { View, Image,Text , Pressable, StatusBar  } from 'react-native';

export default function FixBar({navigation}){
    const handleBack = () => {
        navigation.navigate('Home')
    }

    return(
        <View style={[twrnc`bg-[#EFEFEF] flex flex-row items-center w-full justify-between py-1 px-5`,{height:'7%'}]}>
           <Pressable style={twrnc`flex flex-row h-full items-center justify-start`}
            onPress={handleBack}
           >
                <View style={twrnc`w-2/8 h-3/6`}>
                        <Image 
                            source={require('../../img/icons/arrowLeft.png')}
                            resizeMode="contain"
                            style={{ width: '100%', height:'100%', tintColor:'#7B7B7B' }}
                        />
                    </View>
                    <Text style={twrnc`text-[#7B7B7B] text-sm font-medium`}> voltar</Text>
            </Pressable>

            <View style={twrnc`flex flex-row h-full items-center justify-end mr-2`}>
                    <View style={twrnc`w-2/8 h-4/8 flex`}>
                        <Image 
                            source={require('../../img/icons/Usercircle.png')}
                            resizeMode="contain"
                            style={{ width: '100%', height:'100%', tintColor:'#7B7B7B' }}
                        />
                    </View>
                    <Text style={twrnc`text-[#7B7B7B] text-sm font-medium`}> perfil</Text>
            </View>
        </View>
    )
}