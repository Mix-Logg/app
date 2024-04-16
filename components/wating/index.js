import { View, Image, ActivityIndicator } from 'react-native';
import twrnc from 'twrnc';
export default function Wating(){
    return(
        <View style={twrnc`flex justify-center items-center h-full bg-[#EFEFEF] rounded-2xl`}> 
                <View style={twrnc`w-1/2 h-1/4`}>
                    <Image style={ {width:'100%', height:'100%',} }
                        source={require('../../img/logo/logoAsa.png')}
                        resizeMode="contain"
                    />
                </View>
                <ActivityIndicator size="large" color="#FF5F00" style={{marginTop:'30%'}} />
        </View>
    )
}